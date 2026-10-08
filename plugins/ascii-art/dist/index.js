import { h } from "preact"

// the runtime lives in quartz/static/ascii (see vendor.sh). importing it defines
// <ascii-art>, and custom elements upgrade on their own after SPA swaps, so one
// import is enough. pages put the tag straight in their markdown.
const script = `
;(() => {
  // seconds of animation the visitor actually sees: forward pass + loss flash
  const LANDING_MS = 3000
  // if the piece never draws (blocked script, say), don't strand anyone
  const DRAW_TIMEOUT_MS = 2000

  function autoScroll() {
    const landing = document.querySelector(".landing")
    if (!landing || location.hash || window.scrollY > 0) return
    const art = landing.querySelector("ascii-art")

    let timer = null
    let observer = null
    // no pointerdown: a click to focus the window isn't a request to stay put
    const events = ["wheel", "touchstart", "keydown"]
    const cancel = () => {
      clearTimeout(timer)
      observer?.disconnect()
      events.forEach((e) => window.removeEventListener(e, cancel))
    }
    const go = () => {
      cancel()
      // reduced motion still moves on, just without the glide
      const still = matchMedia("(prefers-reduced-motion: reduce)").matches
      document.getElementById("quartz-body")?.scrollIntoView({ behavior: still ? "auto" : "smooth" })
    }
    // the clock starts at the first drawn frame, not at page load, so a slow
    // script fetch doesn't eat into the animation
    const start = () => {
      observer?.disconnect()
      clearTimeout(timer)
      timer = setTimeout(go, LANDING_MS)
    }

    // whoever touches the page first wins, we don't fight the visitor
    events.forEach((e) => window.addEventListener(e, cancel, { passive: true }))
    window.addCleanup?.(cancel)

    if (!art || art.firstElementChild) return start()
    observer = new MutationObserver(() => art.firstElementChild && start())
    observer.observe(art, { childList: true })
    timer = setTimeout(start, DRAW_TIMEOUT_MS)
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
