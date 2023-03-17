import React, { ReactNode } from "react"
import Message, { MessageProps, WRAPPER_CLASS } from "./message"
import { createPortal } from "react-dom"

let uuid = 0

export interface OpenOptions extends MessageProps {
    content?: ReactNode
    key?: string
}

export function useMessage(): [(o: OpenOptions) => void, ReactNode] {
    const ref = React.useRef<HTMLDivElement>(null)
    const [propsArray, update] = React.useState<OpenOptions[]>([])
    const open = (
        {
            content,
            children,
            key,
            visible,
            ...restProps
        }: OpenOptions
    ) => {
        const newKey = key ?? `r-message-${uuid++}`
        update([
            ...propsArray,
            {
                key: newKey,
                visible: visible ?? true,
                children: content ?? children,
                ...restProps,
            }
        ])
    }
    const close = (items: OpenOptions[], key?: string) => {
        const toBeClosed = items.find(item => item.key === key)

        if (toBeClosed) {
            toBeClosed.visible = false
            update([...items])
        }
    }
    const del = (items: OpenOptions[], key?: string) => {
        update(items.filter(item => item.key !== key))
    }
    const children = propsArray.map(({
        onClose,
        onHidden,
        key,
        ...restProps
    }) => {
        const handleClose = () => {
            close(propsArray, key)

            onClose?.()
        }
        const handleHidden = () => {
            del(propsArray, key)

            onHidden?.()
        }
        return (
            <Message
                key={key}
                onClose={handleClose}
                onHidden={handleHidden}
                {...restProps} />
        )
    })

    const wrapper = propsArray.length ? createPortal(
        <div ref={ref} className={WRAPPER_CLASS}>
            {children}
        </div>,
        document.body
    ) : null

    return [open, wrapper]
}