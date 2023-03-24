import React from "react"
import { createRoot } from "react-dom/client"
import { Callbacks, ModalProps, OpenOptions } from "./types"
import { callAsync, chainFunction, wrapCloseFunc } from "../utils"
import { CloseType } from "../commons/types"
import Modal from "./modal"

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

export function open(options: OpenOptions) {
    let props: OpenOptions = {...options}
    const container = document.createElement("div")
    const root = createRoot(container)
    const o = { closed: false }
    const render = (props: OpenOptions) => {
        const handleHidden = () => {
            callAsync(() => {
                root.unmount()
                container.remove()
            })
        }
        const {
            visible,
            content,
            children,
            onHidden,
            ...restProps
        } = props
        const newProps: ModalProps = {
            ...restProps,
            ...getCloseCallbacks(restProps, close),
            onHidden: chainFunction(handleHidden, onHidden),
            visible: visible ?? true,
            children: content ?? children
        }

        root.render(<Modal {...newProps} />)
    }
    const close = wrapCloseFunc(
        () => render({
            ...props,
            visible: false
        }),
        o
    )
    const update: (opts: OpenOptions) => void = options => {
        if (o.closed) {
            return
        }

        props = { ...props, ...options }

        render(props)
    }

    render(props)
    document.body.appendChild(container)

    return {
        update,
        close
    }
}