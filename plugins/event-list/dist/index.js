import { h } from "preact"
import { resolveRelative, formatDate } from "@quartz-community/utils"

// keep in sync with sidebar-notes so the sidebar and this page agree
const defaults = {
  slug: "events",
  eventTags: ["events", "event", "talks", "talk", "hackathon"],
}

export const EventList = (userOpts) => {
  const opts = { ...defaults, ...userOpts }
  const eventTags = opts.eventTags.map((t) => t.toLowerCase())
  const isEvent = (page) =>
    (page.frontmatter?.tags ?? []).some((t) =>
      eventTags.includes(String(t).replace(/^#/, "").toLowerCase()),
    )
  const when = (page) => page.dates?.created ?? page.dates?.modified

  const EventList = ({ fileData, allFiles, cfg }) => {
    if (fileData.slug !== opts.slug) return null
    const events = allFiles
      .filter((p) => isEvent(p) && !p.frontmatter?.draft && p.slug !== opts.slug)
      .sort((a, b) => (when(b)?.getTime?.() ?? 0) - (when(a)?.getTime?.() ?? 0))

    if (!events.length) return h("p", { class: "event-list-empty" }, "Nothing here yet.")

    return h(
      "ul",
      { class: "event-list" },
      events.map((p) => {
        const d = when(p)
        return h("li", { class: "event-list-item" }, [
          h("div", { class: "event-list-head" }, [
            h(
              "a",
              { href: resolveRelative(fileData.slug, p.slug), class: "internal event-list-title" },
              p.frontmatter?.title ?? p.slug,
            ),
            d &&
              h(
                "time",
                { class: "event-list-date", datetime: d.toISOString() },
                formatDate(d, cfg.locale),
              ),
          ]),
          p.description && h("p", { class: "event-list-desc" }, p.description),
        ])
      }),
    )
  }
  return EventList
}

export default EventList
