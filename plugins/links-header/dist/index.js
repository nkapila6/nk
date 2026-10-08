import { h } from "preact"

const defaults = {
  links: [
    { title: "Home", href: "/" },
    { title: "Masters", href: "/masters/" },
    { title: "Life", href: "/life" },
    { title: "Projects", href: "/projects" },
    { title: "Posts", href: "/posts" },
  ],
}

export const LinksHeader = (userOpts) => {
  const opts = { ...defaults, ...userOpts }
  const LinksHeader = () =>
    h("div", null, [
      h(
        "div",
        { id: "links-header" },
        opts.links.map((l) =>
          h("span", null, [
            l.icon && h("img", { src: l.icon, alt: "" }),
            h("a", { href: l.href }, l.title),
          ]),
        ),
      ),
      h("hr", { class: "links-header-rule" }),
    ])
  return LinksHeader
}

export default LinksHeader
