import React, { createRef, ReactNode } from "react"
import { createRoot } from "react-dom/client"
import {
    Callbacks,
    ModalProps,
    OpenOptions,
    ShortcutOptions,
    ShortcutType
} from "./types"
import {
    callAsync,
    chainFunction,
    wrapCloseFunc
} from "../utils"
import { CloseType } from "../commons/types"
import Modal from "./modal"
import Input from "../basics/input"

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
    let props: OpenOptions = { ...options }
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
            onHidden,
            ...restProps
        } = props
        const newProps: ModalProps = {
            ...restProps,
            ...getCloseCallbacks(restProps, close),
            onHidden: chainFunction(handleHidden, onHidden),
            visible: visible ?? true,
            children: content
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

export function createShortcut(t: ShortcutType) {
    return (
        msg: ReactNode,
        title = "提示",
        {
            backdrop,
            closable,
            okText,
            cancelText,
            keyboard,
            okVariant,
            cancelVariant,
            inputOptions
        }: ShortcutOptions = {}
    ) => {
        const ref = createRef<HTMLInputElement>()
        let newContent = msg

        if (t === "prompt") {
            newContent = (
                <>
                    {msg}
                    <Input ref={ref} {...inputOptions} />
                </>
            )
        }

        return new Promise((resolve, reject) => {
            open({
                cancel: t !== "alert",
                onClose: (t?: CloseType) => reject(t),
                onOk: () => {
                    resolve(
                        t === "prompt" ? ref.current?.value : null
                    )
                },
                title: title ?? "提示",
                content: newContent,
                backdrop,
                keyboard,
                okText,
                cancelText,
                closable,
                okVariant,
                cancelVariant
            })
        })
    }
}

export const alert = createShortcut("alert")
export const confirm = createShortcut("confirm")
export const prompt = createShortcut("prompt")
