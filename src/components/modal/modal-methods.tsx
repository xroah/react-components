import React, { createRef, ReactNode } from "react"
import { createRoot } from "react-dom/client"
import {
    Callbacks,
    HookOpenFunc,
    ModalProps,
    OpenFunc,
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

export function getCloseWhenNeeded(
    close: VoidFunction
) {
    let calling = false

    return (ret?: unknown) => {
        if (calling) {
            return
        }

        calling = true

        if (ret instanceof Promise) {
            const p = ret as Promise<unknown>

            p
                .then(ret => {
                    if (ret !== false) {
                        close()
                    }
                })
                .finally(() => calling = false)

            return
        }

        if (ret !== false) {
            close()
        }

        calling = false
    }
}

export function getCloseCallbacks(
    callbacks: Callbacks,
    close: VoidFunction
) {
    const closeWhenNeeded = getCloseWhenNeeded(close)

    return {
        onOk() {
            closeWhenNeeded(callbacks.onOk?.())
        },
        onCancel() {
            closeWhenNeeded(callbacks.onCancel?.())
        },
        onClose() {
            closeWhenNeeded()
        }
    }
}

export function open(options: OpenOptions) {
    let props: OpenOptions = { ...options }
    const container = document.createElement("div")
    const root = createRoot(container)
    const o = { closed: false }
    const render = (
        props: ModalProps,
        visible = true
    ) => {
        const handleHidden = () => {
            callAsync(() => {
                root.unmount()
                container.remove()
            })
        }
        const {
            content,
            onHidden,
            ...restProps
        } = props as OpenOptions
        const newProps: ModalProps = {
            ...restProps,
            ...getCloseCallbacks(restProps, close),
            onHidden: chainFunction(handleHidden, onHidden),
            visible,
            children: content
        }

        root.render(<Modal {...newProps} />)
    }
    const close = wrapCloseFunc(
        () => render(props, false),
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

export function createShortcut(
    t: ShortcutType,
    openFunc: OpenFunc | HookOpenFunc = open
) {
    return (
        msg: ReactNode,
        title: ReactNode = "提示",
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
            openFunc({
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
