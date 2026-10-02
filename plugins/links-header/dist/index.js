import { h } from "preact"

// icons are fluentui-emoji (MIT), self-hosted in quartz/static/icons
const defaults = {
  links: [
    { title: "Home", href: "/", icon: "/static/icons/home.svg" },
    { title: "Masters", href: "/masters/", icon: "/static/icons/masters.svg" },
    { title: "Life", href: "/life", icon: "/static/icons/life.svg" },
    { title: "Projects", href: "/projects", icon: "/static/icons/projects.svg" },
    { title: "Posts", href: "/posts", icon: "/static/icons/posts.svg" },
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
