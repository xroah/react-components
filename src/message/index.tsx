import React, { ReactNode } from "react"
import { createRoot, Root } from "react-dom/client"
import Message, { MessageProps } from "./message"

type MessageOptions = Omit<MessageProps, "onClose" | "container">

interface MessageItem {
    root: Root,
    container: HTMLElement
}

let uid = 0

const wrapper = document.createElement("div")
const msgMap = new Map<number, MessageItem>()

wrapper.classList.add("r-message-wrapper")

function showMessage(msg: ReactNode, options: MessageOptions) {
    const {
        className,
        closable,
        duration,
        variant,
        icon,
        onShow,
        onShown,
        onHide,
        onHidden
    } = options
    const container = document.createElement("div")
    const root = createRoot(container)
    const id = uid++
    const handleHidden = () => {
        onHidden?.()
        Promise.resolve().then(
            () => {
                root.unmount()
                msgMap.delete(id)
            }
        )
    }

    if (!wrapper.parentElement) {
        document.body.appendChild(wrapper)
    }

    msgMap.set(id, { root, container })

    wrapper.appendChild(container)
    root.render(
        <Message
            variant={variant}
            className={className}
            duration={duration}
            closable={closable}
            icon={icon}
            onShow={onShow}
            onShown={onShown}
            onHide={onHide}
            container={container}
            onHidden={handleHidden}>
            {msg}
        </Message>
    )
}

export {
    showMessage
}