// a tiny net training forever: forward pulses, loss, gradients flowing back,
// edges thickening or thinning as the weights settle. written for nkapila.me
// against the ascii.rest piece contract (meta + default export returning a frame fn)
export const meta = {
    name: "backprop",
    category: "scenes",
    note: "a small net learning, one epoch at a time",
    cols: 100,
    rows: 30,
    fps: 24,
};

const LAYERS = [3, 5, 5, 2];
const PERIOD = 6; // seconds per epoch
const EPOCHS = 24; // then it starts over
// only glyphs the ascii.rest fallback font covers, so rows keep their width
const WEIGHT = [" ", ".", "·", "•", "●"];
const ACT = " .:-=+*#";

// fixed noise so every visitor sees the same net
const rand = (i) => {
    const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
    return x - Math.floor(x);
};
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const ease = (x) => x * x * (3 - 2 * x);

export default function backprop() {
    const { cols, rows } = meta;
    const top = 6, bottom = rows - 4;
    const left = 14, right = cols - 22;

    const layers = LAYERS.map((n, l) => {
        const cx = Math.round(left + (l * (right - left)) / (LAYERS.length - 1));
        return Array.from({ length: n }, (_, k) => ({
            cx,
            cy: Math.round(top + ((k + 0.5) * (bottom - top)) / n),
        }));
    });

    // every edge has a starting weight and the one it converges to
    const edges = [];
    let id = 0;
    for (let l = 0; l < layers.length - 1; l++)
        for (const a of layers[l])
            for (const b of layers[l + 1]) {
                const start = rand(id++);
                const goal = rand(id++ + 999) ** 2;
                const pts = [];
                const x0 = a.cx + 2, x1 = b.cx - 2;
                const n = Math.max(Math.abs(x1 - x0), Math.abs(b.cy - a.cy) * 2);
                for (let s = 0; s <= n; s++) {
                    const f = s / n;
                    pts.push([Math.round(a.cy + (b.cy - a.cy) * f), Math.round(x0 + (x1 - x0) * f)]);
                }
                edges.push({ l, start, goal, pts });
            }

    const grid = Array.from({ length: rows }, () => new Array(cols).fill(" "));
    const put = (r, c, s) => {
        [...s].forEach((ch, i) => {
            if (r >= 0 && r < rows && c + i >= 0 && c + i < cols) grid[r][c + i] = ch;
        });
    };

    return (t) => {
        for (const row of grid) row.fill(" ");
        const epoch = Math.floor(t / PERIOD) % EPOCHS;
        const p = (t % PERIOD) / PERIOD;
        const decay = 0.82 ** epoch;
        const loss = 0.018 + 0.675 * decay;
        const L = layers.length - 1;

        // 0-.4 forward, .4-.5 loss, .5-.9 backward, .9-1 weights settle
        const fwd = p < 0.4 ? (p / 0.4) * L : p < 0.5 ? L : null;
        const bwd = p >= 0.5 && p < 0.9 ? L - ((p - 0.5) / 0.4) * L : null;
        const settle = p >= 0.9 ? ease((p - 0.9) / 0.1) : 0;

        // edges, thickness = |weight|
        for (const e of edges) {
            const now = e.goal + (e.start - e.goal) * decay;
            const next = e.goal + (e.start - e.goal) * decay * 0.82;
            const w = now + (next - now) * settle;
            const ch = WEIGHT[clamp(Math.round(w * (WEIGHT.length - 1)), 1, WEIGHT.length - 1)];
            e.pts.forEach(([r, c], i) => i % 2 === 0 && put(r, c, ch));
        }

        // pulses riding the edges
        const pulse = (pos, glyph) => {
            const l = Math.floor(pos);
            const f = pos - l;
            for (const e of edges) {
                if (e.l !== l) continue;
                const [r, c] = e.pts[Math.round(f * (e.pts.length - 1))];
                put(r, c, glyph);
            }
        };
        if (fwd !== null && fwd < L) pulse(fwd, "█");
        if (bwd !== null && bwd > 0) pulse(bwd, "▓");

        // nodes: light boxes, heavy while a gradient sits on them
        layers.forEach((nodes, l) => {
            const lit = fwd !== null ? fwd >= l : true;
            const grad = bwd !== null && bwd <= l + 0.15 && bwd >= l - 0.85;
            nodes.forEach((n, k) => {
                const a = rand(l * 31 + k * 7 + epoch) * 0.7 + 0.3;
                const flash = l === L && p >= 0.4 && p < 0.5 && Math.floor(t * 8) % 2;
                const mid = flash ? "!" : lit ? ACT[Math.round(a * (ACT.length - 1))] : " ";
                const [tl, h, tr, v, bl, br] = grad ? "┏━┓┃┗┛" : "┌─┐│└┘";
                put(n.cy - 1, n.cx - 1, tl + h + tr);
                put(n.cy, n.cx - 1, v + mid + v);
                put(n.cy + 1, n.cx - 1, bl + h + br);
            });
        });

        layers[0].forEach((n, k) => put(n.cy, n.cx - 8, `x${k + 1} ──`));
        layers[L].forEach((n, k) => put(n.cy, n.cx + 3, `── ŷ${k + 1} ${(0.5 + 0.49 * Math.sin(t + k * 2) * decay).toFixed(2)}`));

        // header and status line
        put(0, 0, "┌" + "─".repeat(cols - 2) + "┐");
        put(1, 0, "│");
        put(1, cols - 1, "│");
        put(1, 2, "backpropagation with nk");
        const stats = `epoch ${String(epoch + 1).padStart(2, "0")}/${EPOCHS}   loss ${loss.toFixed(4)}   lr 3e-4`;
        put(1, cols - 2 - stats.length, stats);
        put(2, 0, "└" + "─".repeat(cols - 2) + "┘");

        const bar = Math.round((1 - (loss - 0.018) / 0.675) * 30);
        put(3, cols - 2 - 32, "[" + "█".repeat(bar) + "░".repeat(30 - bar) + "]");

        const phase = p < 0.4 ? "forward  ──────>  a = σ(Wx + b)"
            : p < 0.5 ? "loss     L = ½‖ŷ − y‖²"
            : p < 0.9 ? "backward <──────  ∂L/∂W = δ · aᵀ"
            : "update   W ← W − η ∂L/∂W";
        put(rows - 1, 2, phase);
        return grid.map((r) => r.join("")).join("\n");
    };
}
