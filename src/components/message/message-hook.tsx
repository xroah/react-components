import React, { ReactNode } from "react"
import { createPortal } from "react-dom"
import Message, { WRAPPER_CLASS } from "./message"
import { HookApi } from "../commons/types"
import { chainFunction, getKeys, isUndef } from "../utils"
import { generateKey, OpenOptions } from "./message-methods"

export function useMessage(): [HookApi<OpenOptions>, ReactNode] {
    const ref = React.useRef<HTMLDivElement>(null)
    const [
        messagesProps,
        setMessagesProps
    ] = React.useState<OpenOptions[]>([])
    const closeMsg = (keys?: string | string[]) => {
        setMessagesProps(
            messagesProps => {
                if (!messagesProps.length) {
                    return messagesProps
                }

                // close all
                if (isUndef(keys)) {
                    messagesProps.forEach(
                        props => props.visible = false
                    )

                    return [...messagesProps]
                }

                const _keys = getKeys(keys!)

                return messagesProps.map(
                    props => {
                        if (_keys.includes(props.key!)) {
                            props.visible = false
                        }

                        return props
                    }
                )
            }
        )
    }
    const close = (key?: string) => {
        setMessagesProps(
            messagesProps => {
                const toBeClosed = messagesProps.find(
                    props => props.key === key
                )

                if (toBeClosed) {
                    toBeClosed.visible = false

                    return [...messagesProps]
                }

                return messagesProps
            }
        )
    }
    const del = (key?: string) => {
        setMessagesProps(
            messagesProps => {
                const len = messagesProps.length
                let shouldUpdate = false

                for (let i = 0; i < len; i++) {
                    const props = messagesProps[i]

                    if (props.key === key) {
                        shouldUpdate = true

                        messagesProps.splice(i, 1)

                        break
                    }
                }

                return shouldUpdate ?
                    [...messagesProps] : messagesProps
            }
        )
    }
    const open = (
        {
            key,
            ...restProps
        }: OpenOptions
    ) => {
        setMessagesProps(
            messagesProps => {
                const newKey = key ?? generateKey()

                if (!isUndef(key)) {
                    const existIndex = messagesProps.findIndex(
                        props => props.key === key
                    )

                    // update the message
                    if (existIndex > -1) {
                        const exist = messagesProps[existIndex]

                        messagesProps[existIndex] = {
                            ...exist,
                            ...restProps
                        }

                        return [...messagesProps]
                    }
                }

                return [
                    ...messagesProps,
                    {
                        key: newKey,
                        ...restProps
                    }
                ]
            }
        )
    }
    const children = messagesProps.map(
        ({
            key,
            visible,
            content,
            children,
            onHidden,
            onClose,
            ...rest
        }) => {
            const newProps = {
                visible: visible ?? true,
                children: content ?? children,
                onHidden: chainFunction(() => del(key), onHidden),
                onClose: chainFunction(() => close(key), onClose),
                ...rest
            }

            return <Message key={key} {...newProps} />
        }
    )

    const wrapper = messagesProps.length ? createPortal(
        <div ref={ref} className={WRAPPER_CLASS}>
            {children}
        </div>,
        document.body
    ) : null

    return [{ open, close: closeMsg }, wrapper]
}