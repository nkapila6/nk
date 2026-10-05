import { h } from "preact"

const defaults = {
  user: "nkapila6",
  // slug -> how the feed looks on that page; pages not listed render nothing
  pages: {
    index: { limit: 1, commits: false, title: "Latest on GitHub" },
    projects: { limit: 5, commits: true, groupByRepo: true },
  },
  // used for every other content page; set to null to show only on listed pages
  default: { limit: 1, commits: false, title: "Latest on GitHub" },
}

// folder and tag listings aren't posts, skip them
const isListing = (slug) =>
  !slug || slug === "404" || slug.endsWith("/index") || slug === "tags" || slug.startsWith("tags/")

// runs in the browser on first load and after every SPA navigation.
// wrapped in an IIFE because all component scripts get bundled into one file
// and the minifier can give our helpers the same names as another plugin's
const script = `
;(() => {
const CACHE_MS = 10 * 60 * 1000
const API = "https://api.github.com"
// stars dominate the public feed and say nothing about what I built
const SKIP = new Set(["WatchEvent", "MemberEvent", "GollumEvent"])

function ago(iso) {
  const s = Math.max(1, Math.floor((Date.now() - new Date(iso).getTime()) / 1000))
  const units = [["y", 31536000], ["mo", 2592000], ["d", 86400], ["h", 3600], ["m", 60]]
  for (const [u, n] of units) if (s >= n) return Math.floor(s / n) + u + " ago"
  return "just now"
}

function cacheGet(key) {
  try {
    const raw = sessionStorage.getItem(key)
    if (!raw) return null
    const { at, data } = JSON.parse(raw)
    return Date.now() - at < CACHE_MS ? data : null
  } catch {
    return null
  }
}

function cacheSet(key, data) {
  try {
    sessionStorage.setItem(key, JSON.stringify({ at: Date.now(), data }))
  } catch {}
}

async function getJson(url) {
  const res = await fetch(url, { headers: { Accept: "application/vnd.github+json" } })
  if (!res.ok) throw new Error(res.status + "")
  return res.json()
}

function describe(e) {
  const p = e.payload || {}
  const repo = e.repo.name
  const repoUrl = "https://github.com/" + repo
  switch (e.type) {
    case "PushEvent": {
      const branch = (p.ref || "").replace("refs/heads/", "")
      return { verb: "Pushed",
        prep: "to",
        push: true, repo, repoUrl, extra: branch, url: p.head ? repoUrl + "/commit/" + p.head : repoUrl, head: p.head }
    }
    case "CreateEvent":
      if (p.ref_type === "repository") return { verb: "Created", repo, repoUrl, url: repoUrl }
      return { verb: "Created " + p.ref_type + " " + (p.ref || ""), repo, repoUrl, prep: "in", url: repoUrl }
    case "DeleteEvent":
      return null
    case "PullRequestEvent": {
      const pr = p.pull_request || {}
      const action = p.action === "closed" && pr.merged ? "Merged" : (p.action || "opened").replace(/^./, (c) => c.toUpperCase())
      return { verb: action + " PR" + (p.number ? " #" + p.number : ""), repo, repoUrl, prep: "in", url: pr.html_url || repoUrl, detail: pr.title }
    }
    case "IssuesEvent": {
      const is = p.issue || {}
      const action = (p.action || "opened").replace(/^./, (c) => c.toUpperCase())
      return { verb: action + " issue", repo, repoUrl, prep: "in", url: is.html_url || repoUrl, detail: is.title }
    }
    case "IssueCommentEvent":
      return { verb: "Commented", repo, repoUrl, prep: "in", url: (p.comment && p.comment.html_url) || repoUrl, detail: p.issue && p.issue.title }
    case "PullRequestReviewEvent":
      return { verb: "Reviewed a PR", repo, repoUrl, prep: "in", url: (p.review && p.review.html_url) || repoUrl }
    case "ReleaseEvent":
      return { verb: "Released " + ((p.release && p.release.tag_name) || ""), repo, repoUrl, prep: "in", url: (p.release && p.release.html_url) || repoUrl }
    case "PublicEvent":
      return { verb: "Open-sourced", repo, repoUrl, url: repoUrl }
    case "ForkEvent":
      return { verb: "Forked", repo, repoUrl, url: (p.forkee && p.forkee.html_url) || repoUrl }
    default:
      return null
  }
}

// collapse back-to-back pushes to the same repo/branch into one line
function build(events, limit) {
  const items = []
  for (const e of events) {
    if (SKIP.has(e.type)) continue
    const d = describe(e)
    if (!d) continue
    d.at = e.created_at
    const last = items[items.length - 1]
    if (last && e.type === "PushEvent" && last.push && last.repo === d.repo && last.extra === d.extra) {
      last.count = (last.count || 1) + 1
      continue
    }
    items.push(d)
    if (items.length >= limit) break
  }
  return items
}

function plural(n, word) {
  return n + " " + word + (n === 1 ? "" : /(ch|sh|s|x)$/.test(word) ? "es" : "s")
}

// one entry per repo, ordered by most recent activity
function buildGrouped(events, limit) {
  const repos = new Map()
  for (const e of events) {
    if (SKIP.has(e.type)) continue
    const d = describe(e)
    if (!d) continue
    let g = repos.get(d.repo)
    if (!g) {
      if (repos.size >= limit) continue
      g = { repo: d.repo, repoUrl: d.repoUrl, at: e.created_at, counts: {}, head: null, url: d.repoUrl }
      repos.set(d.repo, g)
    }
    const kind = e.type === "PushEvent" ? "push"
      : e.type === "CreateEvent" ? (e.payload.ref_type === "repository" ? "new repo" : "new " + e.payload.ref_type)
      : e.type === "PullRequestEvent" ? "PR"
      : e.type === "IssuesEvent" ? "issue"
      : e.type === "ReleaseEvent" ? "release"
      : "other"
    g.counts[kind] = (g.counts[kind] || 0) + 1
    // events arrive newest first, so the first push seen is the latest
    if (d.head && !g.head) {
      g.head = d.head
      g.url = d.url
      g.extra = d.extra
    }
  }
  return [...repos.values()]
    .sort((a, b) => new Date(b.at) - new Date(a.at))
    .map((g) => {
    const parts = Object.entries(g.counts)
      .filter(([k]) => k !== "other")
      .map(([k, n]) => (k === "new repo" ? "created" : plural(n, k)))
    return { group: true, repo: g.repo, repoUrl: g.repoUrl, url: g.url, at: g.at, head: g.head, extra: g.extra, summary: parts.join(" · ") }
  })
}

async function load(user, limit, commits, grouped) {
  const key = "gh-activity:" + user + ":" + limit + ":" + commits + ":" + grouped
  const cached = cacheGet(key)
  if (cached) return cached
  const events = await getJson(API + "/users/" + user + "/events/public?per_page=100")
  const items = grouped ? buildGrouped(events, limit) : build(events, limit)
  if (commits) {
    // push events no longer carry messages, so look up the head commit
    await Promise.all(
      items
        .filter((i) => i.head)
        .map(async (i) => {
          try {
            const c = await getJson(API + "/repos/" + i.repo + "/commits/" + i.head)
            i.detail = (c.commit && c.commit.message ? c.commit.message : "").split("\\n")[0]
          } catch {}
        }),
    )
  }
  cacheSet(key, items)
  return items
}

function el(tag, cls, text) {
  const n = document.createElement(tag)
  if (cls) n.className = cls
  if (text != null) n.textContent = text
  return n
}

function link(href, text, cls) {
  const a = el("a", cls ? cls + " external" : "external", text)
  a.href = href
  a.target = "_blank"
  a.rel = "noopener noreferrer"
  return a
}

function render(list, items, user) {
  list.replaceChildren()
  if (!items.length) {
    list.append(el("li", "gh-activity-empty", "Nothing public lately."))
    return
  }
  for (const i of items) {
    const li = el("li", "gh-activity-item")
    const line = el("div", "gh-activity-line")
    const what = el("span", "gh-activity-what")
    if (i.group) {
      what.append(link(i.repoUrl, i.repo.startsWith(user + "/") ? i.repo.slice(user.length + 1) : i.repo, "gh-activity-repo"))
      if (i.summary) what.append(el("span", "gh-activity-summary", i.summary))
      line.append(what)
      const t = el("time", "gh-activity-time", ago(i.at))
      t.dateTime = i.at
      t.title = new Date(i.at).toLocaleString()
      line.append(t)
      li.append(line)
      if (i.detail) {
        const dl = link(i.url, i.detail, "gh-activity-detail")
        li.append(dl)
      }
      list.append(li)
      continue
    }
    what.append(link(i.url, i.verb + (i.count > 1 ? " " + i.count + "x" : "")))
    what.append(document.createTextNode(i.prep ? " " + i.prep + " " : " "))
    what.append(link(i.repoUrl, i.repo.startsWith(user + "/") ? i.repo.slice(user.length + 1) : i.repo, "gh-activity-repo"))
    if (i.extra) what.append(el("span", "gh-activity-branch", i.extra))
    line.append(what)
    const time = el("time", "gh-activity-time", ago(i.at))
    time.dateTime = i.at
    time.title = new Date(i.at).toLocaleString()
    line.append(time)
    li.append(line)
    if (i.detail) li.append(el("div", "gh-activity-detail", i.detail))
    list.append(li)
  }
}

document.addEventListener("nav", async () => {
  for (const root of document.querySelectorAll(".gh-activity")) {
    const list = root.querySelector(".gh-activity-list")
    if (!list || root.dataset.loaded === "1") continue
    root.dataset.loaded = "1"
    const user = root.dataset.user
    try {
      const items = await load(user, Number(root.dataset.limit) || 5, root.dataset.commits === "true", root.dataset.group === "true")
      render(list, items, user)
    } catch (err) {
      list.replaceChildren()
      const li = el("li", "gh-activity-empty")
      li.append(document.createTextNode("Couldn't load activity right now. "))
      li.append(link("https://github.com/" + user, "See it on GitHub"))
      list.append(li)
    }
  }
})
})()
`

export const GithubActivity = (userOpts) => {
  const opts = { ...defaults, ...userOpts }
  const GithubActivity = ({ fileData }) => {
    const page = opts.pages[fileData.slug] ?? (isListing(fileData.slug) ? null : opts.default)
    if (!page) return null
    const variant = page.commits ? "full" : "compact"
    return h(
      "section",
      {
        class: "gh-activity gh-activity-" + variant,
        "data-user": opts.user,
        "data-limit": String(page.limit ?? 5),
        "data-commits": String(!!page.commits),
        "data-group": String(!!page.groupByRepo),
      },
      [
        h("div", { class: "gh-activity-header" }, [
          h("h3", null, page.title ?? "Recent GitHub activity"),
          h(
            "a",
            {
              href: "https://github.com/" + opts.user,
              class: "external",
              target: "_blank",
              rel: "noopener noreferrer",
            },
            "@" + opts.user,
          ),
        ]),
        h(
          "ul",
          { class: "gh-activity-list" },
          h("li", { class: "gh-activity-empty" }, "Loading..."),
        ),
      ],
    )
  }
  GithubActivity.afterDOMLoaded = script
  return GithubActivity
}

export default GithubActivity
