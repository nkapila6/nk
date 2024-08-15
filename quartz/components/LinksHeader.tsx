import { QuartzComponentConstructor } from "./types"
import style from "./styles/linksHeader.scss"

interface Options {
  links: Record<string, string>
}

export default (() => {
  function LinksHeader() {
    return (
      <div>
        <div id="links-header">
          <span>
            <img src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Card%20index/Color/card_index_color.svg"></img>
            <a href="/">Home</a>
          </span>
          <span>
            <img src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Books/Color/books_color.svg"></img>
            <a href="/masters/">Masters</a>
          </span>
          <span>
            <img src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Brain/Color/brain_color.svg"></img>
            <a href="/life">Life</a>
          </span>
          <span>
            <img src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/14053d26005b9afe3ce0e020862ed5ab2335f989/assets/Light%20bulb/Color/light_bulb_color.svg"></img>
            <a href="/lighting">Lighting</a>
          </span>
          <span>
            <img src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/14053d26005b9afe3ce0e020862ed5ab2335f989/assets/File%20folder/Flat/file_folder_flat.svg"></img>
            <a href="/posts">Posts</a>
          </span>
          {/* <span>
            <img src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Laptop/Color/laptop_color.svg"></img>
            <a href="https://github.com/nkapila6">Github</a>
          </span> */}
        </div>
      <hr style="background-color: var(--gray); border-top: 1px var(--gray) solid; margin-top: 1.3rem"></hr>
      </div>
    )
  }

  LinksHeader.css = style
  return LinksHeader
}) satisfies QuartzComponentConstructor