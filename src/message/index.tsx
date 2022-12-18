import React, { ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Message, { MessageProps } from "./message"

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

                console.log(closeSet.size)
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

function closeAll() {
    for (const close of closeSet) {
        close()
    }
}

export {
    show,
    closeAll
}