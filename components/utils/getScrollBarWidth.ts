export default () => {
    const div = document.createElement("div");
    const SIZE = 200;
    div.style.cssText = `
        position: absolute;
        left: -10000px;
        overflow: scroll;
        visibility: hidden;
        width: ${SIZE}px;
        height: ${SIZE}px;
     `;
    const child = document.createElement("div");

    div.appendChild(child);
    document.body.appendChild(div);

    const width = 200 - child.offsetWidth;

    document.body.removeChild(div);

    return width;
}