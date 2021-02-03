export default () => {
    const div = document.createElement("div")
    const SIZE = 200
    const child = document.createElement("div")
    let width

    div.style.cssText = `
        position: absolute;
        left: -10000px;
        overflow: scroll;
        width: ${SIZE}px;
        height: ${SIZE}px;
     `

    div.appendChild(child)
    document.body.appendChild(div)

    width = div.offsetWidth - child.offsetWidth

    document.body.removeChild(div)

    return width
}