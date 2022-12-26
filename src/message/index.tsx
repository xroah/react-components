import React, { ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Message, { MessageProps } from "./message"
import XFill from "../icons/x-fill"
import { Variant } from "../commons/types"
import InfoFill from "../icons/info-fill"
import CheckFill from "../icons/check-fill"
import WarnFill from "../icons/warn-fill"

const wrapper = document.createElement("div")
const closeSet = new Set<VoidFunction>()

wrapper.classList.add("r-message-wrapper")

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
    const close = () => render(false)
    const render = (visible: boolean) => {
        root.render(
            <Message
                variant={variant}
                className={className}
                style={style}
                duration={duration}
                closable={closable}
                visible={visible}
                icon={icon}
                onClose={close}
                onShow={onShow}
                onShown={onShown}
                onHide={onHide}
                container={container}
                onHidden={handleHidden}>
                {msg}
            </Message>
        )
    }
    const handleHidden = () => {
        onHidden?.()
        Promise.resolve().then(
            () => {
                root.unmount()
                closeSet.delete(close)
            }
        )
    }

    if (!wrapper.parentElement) {
        document.body.appendChild(wrapper)
    }

    closeSet.add(close)

    wrapper.appendChild(container)
    render(true)

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