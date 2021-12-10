import * as React from "react"
import {createPortal} from "react-dom"
import Backdrop from "../Commons/Backdrop"
import {ModalBackdropProps} from "./types"

export default function ModalBackdrop(
    {visible}: ModalBackdropProps
) {
    let container: HTMLElement | null = null
    const removeBackdrop = () => {
        if (container) {
            document.body.removeChild(container)

            container = null
        }
    }

    if (!container) {
        container = document.createElement("div")

        document.body.appendChild(container)
    }

    return createPortal(
        <Backdrop
            className="modal-backdrop"
            onExited={removeBackdrop}
            visible={visible} />,
        container
    )
}