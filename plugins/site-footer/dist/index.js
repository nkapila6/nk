import { h } from "preact"
import { Footer } from "@quartz-community/footer/components"

const defaults = {
  author: "Nikhil Kapila",
  authorUrl: "https://github.com/nkapila6/",
  links: {},
}

export const SiteFooter = (userOpts) => {
  const opts = { ...defaults, ...userOpts }
  const SiteFooter = ({ displayClass }) =>
    h("footer", { class: displayClass ?? "" }, [
      h("a", { href: opts.authorUrl }, opts.author),
      ` © ${new Date().getFullYear()}`,
      h("br"),
      h(
        "ul",
        null,
        Object.entries(opts.links).map(([text, link]) =>
          h("li", null, h("a", { href: link }, text)),
        ),
      ),
    ])
  // reuse the stock footer styles
  SiteFooter.css = Footer().css
  return SiteFooter
}

export default SiteFooter
