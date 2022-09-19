import * as React from "react"
import n from "../../src/Notification"
import {Placement} from "../../src/Notification/Notification"

let uid = 0

export default () => {
    const open = (placement: Placement) => {
        n.open(
            <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Labore, facere id ut autem veritatis,
                vero ea quis eligendi dignissimos,
                eveniet rerum deleniti! Iure doloremque quos tenetur ad.
                Adipisci, dicta. Tempore.
            </div>,
            {
                title: `Notification${uid++}`,
                placement
            }
        )
    }
    const openTopRight = () => open("topRight")
    const openBottomRight = () => open("bottomRight")
    const openBottomLeft = () => open("bottomLeft")
    const openTopLeft = () => open("topLeft")

    return (
        <>
            <button
                className="btn btn-info"
                onClick={openTopRight}>
                Show top right
            </button>
            <button
                className="btn btn-info ms-3"
                onClick={openBottomRight}>
                Show bottom right
            </button>
            <button
                className="btn btn-info ms-3"
                onClick={openBottomLeft}>
                Show bottom left
            </button>
            <button
                className="btn btn-info ms-3"
                onClick={openTopLeft}>
                Show top left
            </button>
        </>
    )
}