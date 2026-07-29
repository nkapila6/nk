import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import type { QuartzPluginData } from "./quartz/plugins/vfile"

const EVENT_TAGS = ["events", "event", "talks", "talk", "hackathon"]

// true if the page has any event-ish tag (case-insensitive, leading # ignored)
const isEventPage = (page: QuartzPluginData): boolean => {
  const tags = (page.frontmatter?.tags ?? []).map((t: string) => t.replace(/^#/, "").toLowerCase())
  return tags.some((t: string) => EVENT_TAGS.includes(t))
}

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [Component.LinksHeader()],
  afterBody: [
    Component.Redirect(),
    Component.Comments({
      provider: "giscus",
      options: {
        // from data-repo
        repo: "nkapila6/nk",
        // from data-repo-id
        repoId: "R_kgDOMjKIhg",
        // from data-category
        category: "Announcements",
        // from data-category-id
        categoryId: "DIC_kwDOMjKIhs4ChmAO",
      },
    }),
  ],
  footer: Component.Footer({
    links: {
      // GitHub: "https://github.com/nkapila6",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    //  Component.DesktopOnly(Component.Explorer({
    //   title: "Navigation",
    //   folderClickBehavior: "collapse",
    //    folderDefaultState: "collapsed",
    //    useSavedState: false,
    //    filterFn: (node) => node.name !== "tags",
    //  })),
    Component.DesktopOnly(
      Component.RecentNotes({
        title: "Recently Created",
        limit: 5,
        filter: (page) => {
          // skipping pages with custom md frontmatter
          if (page.frontmatter?.exclude === true) {
            return false
          }
          // events are mutually exclusive - shown in the Events section below
          if (isEventPage(page)) {
            return false
          }
          // send all others
          return page.slug !== "index" && !page.frontmatter?.draft
        },
      }),
    ),
    Component.DesktopOnly(
      Component.RecentNotes({
        title: "Events",
        limit: 5,
        filter: (page) => {
          // only pages tagged as events/talks/hackathons
          if (page.frontmatter?.exclude === true) {
            return false
          }
          if (!isEventPage(page)) {
            return false
          }
          return page.slug !== "index" && !page.frontmatter?.draft
        },
      }),
    ),
  ],
  right: [
    //  Component.DesktopOnly(Component.Darkmode()),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Graph(),
    // Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.ArticleTitle()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(
      Component.RecentNotes({
        title: "Recently Created",
        limit: 5,
        filter: (page) => {
          // skipping pages with custom md frontmatter
          if (page.frontmatter?.exclude === true) {
            return false
          }
          // events are mutually exclusive - shown in the Events section below
          if (isEventPage(page)) {
            return false
          }
          // send all others
          return page.slug !== "index" && !page.frontmatter?.draft
        },
      }),
    ),
    Component.DesktopOnly(
      Component.RecentNotes({
        title: "Events",
        limit: 5,
        filter: (page) => {
          // only pages tagged as events/talks/hackathons
          if (page.frontmatter?.exclude === true) {
            return false
          }
          if (!isEventPage(page)) {
            return false
          }
          return page.slug !== "index" && !page.frontmatter?.draft
        },
      }),
    ),
  ],
  right: [],
}

// export const defaultListPageLayout: PageLayout = {
//   beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
//   left: [
//     Component.PageTitle(),
//     Component.MobileOnly(Component.Spacer()),
//     Component.Search(),
//     Component.Darkmode(),
//     // Component.DesktopOnly(Component.Explorer()),
//     Component.DesktopOnly(Component.RecentNotes({
//       limit: 3
//     }
//     ))
//   ],
//   right: [],
// }
