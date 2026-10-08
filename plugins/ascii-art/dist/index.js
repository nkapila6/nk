import { h } from "preact"

// the runtime lives in quartz/static/ascii (see vendor.sh). importing it defines
// <ascii-art>, and custom elements upgrade on their own after SPA swaps, so one
// import is enough. pages put the tag straight in their markdown.
const script = `
;(() => {
  // enough for the forward pass and the loss flash
  const LANDING_MS = 3000

  function autoScroll() {
    const landing = document.querySelector(".landing")
    if (!landing || location.hash || window.scrollY > 0) return

    // no pointerdown: a click to focus the window isn't a request to stay put
    const events = ["wheel", "touchstart", "keydown"]
    const cancel = () => {
      clearTimeout(timer)
      events.forEach((e) => window.removeEventListener(e, cancel))
    }
    // whoever touches the page first wins, we don't fight the visitor
    const timer = setTimeout(() => {
      cancel()
      // reduced motion still moves on, just without the glide
      const still = matchMedia("(prefers-reduced-motion: reduce)").matches
      document.getElementById("quartz-body")?.scrollIntoView({ behavior: still ? "auto" : "smooth" })
    }, LANDING_MS)
    events.forEach((e) => window.addEventListener(e, cancel, { passive: true }))
    window.addCleanup?.(cancel)
  }

  function onNav() {
    if (document.querySelector("ascii-art")) import("/static/ascii/ascii.js")
    autoScroll()
  }
  // quartz fires "nav" on first load too, with or without SPA
  document.addEventListener("nav", onNav)
})()
`

export const AsciiArt = () => {
  // markdown can't reach the 404 page and its minimal frame only renders
  // body + footer, so this sits in the footer slot and draws the piece there
  const AsciiArt = ({ fileData, displayClass }) =>
    fileData.slug === "404"
      ? h("ascii-art", { class: `ascii-404 ${displayClass ?? ""}`, piece: "not-found", label: "404, page not found" })
      : null
  AsciiArt.afterDOMLoaded = script
  return AsciiArt
}

export default AsciiArt
