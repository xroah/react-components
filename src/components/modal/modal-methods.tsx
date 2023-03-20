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

export function open(
    {
        content,
        children,
        ...restProps
    }: OpenOptions
) {

    let props: ModalProps = {
        children: content ?? children,
        visible: true,
        ...restProps,
    }
    const container = document.createElement("div")
    const root = createRoot(container)
    const o = { closed: false }
    const render = (props: ModalProps) => {
        const handleHidden = () => {
            callAsync(() => {
                root.unmount()
                container.remove()
            })
        }
        const newProps: ModalProps = {
            ...props,
            ...getCloseCallbacks(props, close)
        }
        newProps.onHidden = chainFunction(
            handleHidden,
            props.onHidden
        )

        root.render(<Modal {...newProps} />)
    }
    const close = wrapCloseFunc(
        () => render({
            ...props,
            visible: false
        }),
        o
    )
    const update: (opts: OpenOptions) => void = ({
        content,
        visible,
        children,
        ...rest
    }) => {
        if (o.closed) {
            return
        }

        props.visible = visible ?? props.visible
        props.children = content ?? children ?? props.children
        props = { ...props, ...rest }

        render(props)
    }

    render(props)
    document.body.appendChild(container)

    return {
        update,
        close
    }
}