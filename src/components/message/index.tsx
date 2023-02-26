import React, { ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Message, { MessageProps } from "./message"
import XFill from "../icons/x-fill"
import { Variant } from "../commons/types"
import InfoFill from "../icons/info-fill"
import CheckFill from "../icons/check-fill"
import WarnFill from "../icons/warn-fill"
import { getDynamicWrapper, unmountAsync } from "../utils"

let wrapper: HTMLElement | null = null
const closeSet = new Set<VoidFunction>()

function show(msg: ReactNode, options: MessageProps) {
    const {
        className,
        closable,
        duration,
        variant,
        icon,
        style,
        onShow,
        onShown,
        onHide,
        onHidden
    } = options
    const container = document.createElement("div")
    const root = createRoot(container)
    const render = (visible: boolean) => {
        const props = {
            variant,
            className,
            style,
            duration,
            closable,
            visible,
            icon,
            onClose: close,
            onShown,
            onShow,
            onHide,
            onHidden: handleHidden,
            container,
            children: msg
        }

        root.render(<Message {...props} />)
    }
    const handleHidden = () => {
        onHidden?.()
        unmountAsync(
            root,
            () => {
                closeSet.delete(close)

                if (closeSet.size === 0) {
                    wrapper?.remove()

                    wrapper = null
                }
            }
        )
    }
    let closed = false
    const close = () => {
        if (closed) {
            return
        }

        closed = true

        render(false)
    }
    wrapper = getDynamicWrapper(wrapper, "r-message-wrapper")

    closeSet.add(close)
    render(true)
    wrapper.appendChild(container)

    return close
}

function createShortcut(variant: Variant, defaultIcon: ReactNode) {
    type Options = Omit<MessageProps, "variant">

    return (msg: ReactNode, options: Options = {}) => {
        const {
            icon = defaultIcon,
            ...restOptions
        } = options

        return show(
            msg,
            {
                icon,
                ...restOptions,
                variant
            }
        )
    }
}

function closeAll() {
    for (const close of closeSet) {
        close()
    }
}

const error = createShortcut("danger", <XFill />)
const info = createShortcut("info", <InfoFill />)
const success = createShortcut("success", <CheckFill />)
const warn = createShortcut("warning", <WarnFill />)

export {
    show,
    closeAll,
    error,
    info,
    success,
    warn
}
