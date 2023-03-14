import React from "react"
import { createRoot } from "react-dom/client"
import { OpenOptions } from "./types"
import {
    callAsync,
    createCloseFunc,
    noop
} from "../utils"
import { CloseType } from "../commons/types"
import Modal from "./modal"

function closeWhenNeeded(ret: unknown, close: VoidFunction) {
    if (ret instanceof Promise) {
        const p = ret as Promise<unknown>

        p.then(close)
        
        return
    }

    if (ret !== false) {
        close()
    }
}

function open(
    {
        onOk = noop,
        onCancel = noop,
        onClose = noop,
        content,
        children,
        
        onHidden,
        ...restProps
    }: OpenOptions
) {
    const handleOk = () => {
        closeWhenNeeded(onOk(), close)
    }
    const handleCancel = () => {
        closeWhenNeeded(onCancel(), close)
    }
    const handleClose = (t?: CloseType) => {
        closeWhenNeeded(onClose(t), close)
    }
    const handleHidden = () => {
        onHidden?.()

        callAsync(() => {
            root.unmount()
            container.remove()
        })
    }
    const container = document.createElement("div")
    const root = createRoot(container)
    const render = (visible: boolean) => {
        restProps.visible = visible

        root.render(
            <Modal
                onOk={handleOk}
                onCancel={handleCancel}
                onClose={handleClose}
                onHidden={handleHidden}
                {...restProps}>
                {content ?? children}
            </Modal>
        )
    }
    const close = createCloseFunc(render)

    render(true)
    document.body.appendChild(container)

    return close
}

export {
    open
}