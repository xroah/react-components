import React from "react"
import { createRoot } from "react-dom/client"
import { ModalProps, OpenOptions } from "./types"
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
        content,
        children,
        onOk = noop,
        onCancel = noop,
        onClose = noop,
        onHidden,
        ...restProps
    }: OpenOptions
) {
    let props: ModalProps = {}
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
    const o = { closed: false }
    const render = (visible: boolean) => {
        props.visible = visible

        root.render(<Modal {...props} />)
    }
    const close = createCloseFunc(render, o)
    const update = ({
        content,
        onOk: uOnOk,
        onCancel: uOnCancel,
        onClose: uOnClose,
        onHidden: uOnHidden,
        visible,
        ...rest
    }: OpenOptions
    ) => {
        if (o.closed) {
            return
        }

        onOk = onOk ?? uOnOk
        onCancel = onCancel ?? uOnCancel
        onClose = onClose ?? uOnClose
        onHidden = onHidden ?? uOnHidden

        props.children = content ?? props.children
        props = {
            ...props,
            ...rest
        }

        render(visible ?? true)
    }
    props = {
        ...restProps,
        onOk: handleOk,
        onCancel: handleCancel,
        onClose: handleClose,
        onHidden: handleHidden,
        children: content ?? children
    }

    render(true)
    document.body.appendChild(container)

    return {
        update,
        close
    }
}

export {
    open
}