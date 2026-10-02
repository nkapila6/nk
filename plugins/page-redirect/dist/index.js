import { h } from "preact"

// pages with `redirect:` in frontmatter open that URL in a new tab
export const PageRedirect = () => {
  const PageRedirect = ({ fileData }) => {
    const url = fileData.frontmatter?.redirect
    if (!url) return null
    return h("script", {
      dangerouslySetInnerHTML: { __html: `window.open(${JSON.stringify(String(url))}, "_blank")` },
    })
  }
  return PageRedirect
}

export default PageRedirect
