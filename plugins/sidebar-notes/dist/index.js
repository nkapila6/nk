import { h } from "preact"
import { RecentNotes } from "@quartz-community/recent-notes/components"

const defaults = {
  limit: 5,
  recentTitle: "Recently Created",
  eventsTitle: "Events",
  eventTags: ["events", "event", "talks", "talk", "hackathon"],
}

// recent-notes only takes one filter, so render two of them: events vs everything else
export const SidebarNotes = (userOpts) => {
  const opts = { ...defaults, ...userOpts }
  const eventTags = opts.eventTags.map((t) => t.toLowerCase())

  const isEvent = (page) =>
    (page.frontmatter?.tags ?? []).some((t) =>
      eventTags.includes(String(t).replace(/^#/, "").toLowerCase()),
    )
  const listed = (page) =>
    page.frontmatter?.exclude !== true && page.slug !== "index" && !page.frontmatter?.draft

  const Recent = RecentNotes({
    title: opts.recentTitle,
    limit: opts.limit,
    filter: (p) => listed(p) && !isEvent(p),
  })
  const Events = RecentNotes({
    title: opts.eventsTitle,
    limit: opts.limit,
    filter: (p) => listed(p) && isEvent(p),
  })

  const SidebarNotes = (props) =>
    h("div", { class: ["sidebar-notes", props.displayClass].filter(Boolean).join(" ") }, [
      h(Recent, { ...props, displayClass: undefined }),
      h(Events, { ...props, displayClass: undefined }),
    ])
  SidebarNotes.css = Recent.css
  return SidebarNotes
}

export default SidebarNotes
