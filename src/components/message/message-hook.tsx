import React, {
    ReactElement,
    ReactNode,
    cloneElement
} from "react"
import Message, { MessageProps, WRAPPER_CLASS } from "./message"
import { createPortal } from "react-dom"

let uuid = 0

export interface OpenOptions extends MessageProps {
    content?: ReactNode
}


interface MessageItem {
    el: ReactElement
    key: string
    visible: boolean
}

export function useMessage(): [(o: OpenOptions) => void, ReactNode] {
    const ref = React.useRef<HTMLDivElement>(null)
    const [items, update] = React.useState<MessageItem[]>([])
    const open = (
        {
            content,
            children,
            ...restProps
        }: OpenOptions
    ) => {
        const key = `r-message-${uuid++}`
        update([
            ...items,
            {
                el: (
                    <Message {...restProps}>
                        {content ?? children}
                    </Message>
                ),
                key,
                visible: true
            }
        ])
    }
    const close = (items: MessageItem[], key: string) => {
        const toBeClosed = items.find(item => item.key === key)

        if (toBeClosed) {
            toBeClosed.visible = false
            update([...items])
        }
    }
    const del = (items: MessageItem[], key: string) => {
        update(items.filter(item => item.key !== key))
    }
    const children = items.map(item => {
        const {
            key,
            el,
            visible
        } = item

        return cloneElement(
            el,
            {
                key,
                visible,
                onClose() {
                    el.props.onClose?.()

                    close(items, key)
                },
                onHidden() {
                    el.props.onHidden?.()

                    del(items, key)
                }
            }
        )
    })

    const wrapper = items.length ? createPortal(
        <div ref={ref} className={WRAPPER_CLASS}>
            {children}
        </div>,
        document.body
    ) : null

    return [open, wrapper]
}