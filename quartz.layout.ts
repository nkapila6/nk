import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [Component.LinksHeader()],
  afterBody: [
    // Component.Comments({
    //   provider: 'giscus',
    //   options: {
    //     // from data-repo
    //     repo: 'nkapila6/nk',
    //     // from data-repo-id
    //     repoId: 'R_kgDOMjKIhg',
    //     // from data-category
    //     category: 'Announcements',
    //     // from data-category-id
    //     categoryId: 'DIC_kwDOMjKIhs4ChmAO',
    //   }
    // }),
  ],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/nkapila6",
      // "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    // Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.MobileOnly(Component.Darkmode()),
    Component.DesktopOnly(Component.Explorer({
      title: "Navigation",
      folderClickBehavior: "collapse",
      folderDefaultState: "collapsed",
      useSavedState: false,
      filterFn: (node) => node.name !== "tags",
    })),
    Component.DesktopOnly(Component.RecentNotes({
      title: "Recently Created",
      limit: 5
    })),
  ],
  right: [
    Component.DesktopOnly(Component.Darkmode()),
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
    Component.DesktopOnly(Component.RecentNotes({
      title: "Recently Created",
      limit: 5
    })),
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
