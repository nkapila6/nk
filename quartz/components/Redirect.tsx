import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

function Redirect({ fileData }: QuartzComponentProps) {
  const redirectUrl = fileData.frontmatter?.redirect

  if (!redirectUrl) {
    return null
  }

  return (
    <script dangerouslySetInnerHTML={{
      __html: `
        // Redirect when the page loads
        window.location.href = "${redirectUrl}";
      `
    }} />
  )
}

export default (() => {
  return Redirect
}) satisfies QuartzComponentConstructor