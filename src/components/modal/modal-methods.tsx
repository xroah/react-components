import React from "react"
import { createRoot } from "react-dom/client"
import { Callbacks, ModalProps, OpenOptions } from "./types"
import { callAsync, createCloseFunc, pick } from "../utils"
import { CloseType } from "../commons/types"
import Modal from "./modal"

export const callbackKeys: Array<keyof Callbacks> = [
    "onHidden",
    "onClose",
    "onOk",
    "onCancel"
]

export function closeWhenNeeded(
    ret: unknown,
    close: VoidFunction
) {
    if (ret instanceof Promise) {
        const p = ret as Promise<unknown>

        p.then(close)

        return
    }

    if (ret !== false) {
        close()
    }
}

export function getCloseCallbacks(
    callbacks: Callbacks,
    close: VoidFunction
) {
    return {
        onOk() {
            closeWhenNeeded(callbacks.onOk?.(), close)
        },
        onCancel() {
            closeWhenNeeded(callbacks.onCancel?.(), close)
        },
        onClose(t?: CloseType) {
            closeWhenNeeded(callbacks.onClose?.(t), close)
        }
    }
}

export function open(
    {
        content,
        children,
        ...restProps
    }: OpenOptions
) {
    let callbacks: Callbacks = pick(restProps, callbackKeys)
    const container = document.createElement("div")
    const root = createRoot(container)
    const o = { closed: false }
    const render = (visible: boolean) => {
        props.visible = visible

        root.render(<Modal {...props} />)
    }
    const handleHidden = () => {
        callbacks.onHidden?.()

        callAsync(() => {
            root.unmount()
            container.remove()
        })
    }
    const close = createCloseFunc(render, o)
    let props: ModalProps = {
        children: content ?? children,
        onHidden: handleHidden,
        ...restProps,
        ...getCloseCallbacks(callbacks, close)
    }
    const update: (opts: OpenOptions) => void = ({
        content,
        visible,
        ...rest
    }) => {
        if (o.closed) {
            return
        }

        props.children = content ?? props.children
        props = { ...props, ...rest }
        callbacks = pick(rest, callbackKeys)

        render(visible ?? true)
    }

    render(true)
    document.body.appendChild(container)

    return {
        update,
        close
    }
}