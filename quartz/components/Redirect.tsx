import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

function Redirect({ fileData }: QuartzComponentProps) {
  const redirectUrl = fileData.frontmatter?.redirect

  if (!redirectUrl) {
    return null
  }

  return (
    <script dangerouslySetInnerHTML={{
      __html: `
        // open in new tab
        // window.location.href = "${redirectUrl}";
        window.open("${redirectUrl}", "_blank");
      `
    }} />
  )
}

export default (() => {
  return Redirect
}) satisfies QuartzComponentConstructor