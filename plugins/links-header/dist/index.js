import { h } from "preact"

const emoji = (path) =>
  `https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/${path}`

const defaults = {
  links: [
    { title: "Home", href: "/", icon: emoji("Card%20index/Color/card_index_color.svg") },
    { title: "Masters", href: "/masters/", icon: emoji("Books/Color/books_color.svg") },
    { title: "Life", href: "/life", icon: emoji("Brain/Color/brain_color.svg") },
    { title: "Posts", href: "/posts", icon: emoji("File%20folder/Flat/file_folder_flat.svg") },
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
