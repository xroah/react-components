import React, { ReactNode } from "react"
import { createRoot, Root } from "react-dom/client"
import Message, { MessageProps } from "./message"

let uid = 0

const wrapper = document.createElement("div")
const msgMap = new Map<number, VoidFunction>()

wrapper.classList.add("r-message-wrapper")

function showMessage(msg: ReactNode, options: MessageProps) {
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
    const close = () => render(false)
    const render = (visible: boolean) => {
        root.render(
            <Message
                variant={variant}
                className={className}
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
                msgMap.delete(id)
            }
        )
    }

    if (!wrapper.parentElement) {
        document.body.appendChild(wrapper)
    }

    msgMap.set(id, close)

    wrapper.appendChild(container)
    render(true)
}

function closeAll() {
    for (const [_, close] of msgMap) {
        close()
    }
}

export {
    showMessage,
    closeAll
}