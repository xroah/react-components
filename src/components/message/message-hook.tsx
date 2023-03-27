import React, { ReactNode } from "react"
import { createPortal } from "react-dom"
import Message, { WRAPPER_CLASS } from "./message"
import {
    chainFunction,
    getKeys,
    isUndef,
    generateKey
} from "../utils"
import { createShortcut } from "./message-methods"
import XFill from "../icons/x-fill"
import InfoFill from "../icons/info-fill"
import CheckFill from "../icons/check-fill"
import WarnFill from "../icons/warn-fill"
import { HookOptions, MessageHookApi, OpenOptions } from "./types"

export function useMessage(): [MessageHookApi, ReactNode] {
    const ref = React.useRef<HTMLDivElement>(null)
    const [
        messagesProps,
        setMessagesProps
    ] = React.useState<HookOptions[]>([])
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
                        if (_keys.has(props.key!)) {
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
                const handleHidden = () => del(newKey)
                const handleClose = () => close(newKey)
                let index = -1
                let newProps: HookOptions = {}

                if (!isUndef(key)) {
                    const existIndex = messagesProps.findIndex(
                        props => props.key === key
                    )

                    // update the message
                    if (existIndex > -1) {
                        index = existIndex
                        const exist = messagesProps[existIndex]
                        newProps = { ...exist, ...restProps }
                    }
                }

                if (index === -1) {
                    index = messagesProps.length
                    newProps = { key: newKey, ...restProps }
                }

                newProps._onHidden = chainFunction(
                    handleHidden,
                    newProps.onHidden
                )
                newProps._onClose = chainFunction(
                    handleClose,
                    newProps.onClose
                )
                messagesProps[index] = newProps

                return [...messagesProps]
            }
        )
    }
    const children = messagesProps.map(
        ({
            key,
            visible,
            content,
            _onClose,
            _onHidden,
            ...rest
        }) => {
            const newProps = {
                ...rest,
                visible: visible ?? true,
                children: content ?? children,
                onHidden: _onHidden,
                onClose: _onClose
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

    return [
        {
            open,
            close: closeMsg,
            info: createShortcut("info", <InfoFill />, open),
            warn: createShortcut("warning", <WarnFill />, open),
            success: createShortcut("success", <CheckFill />, open),
            error: createShortcut("danger", <XFill />, open)
        },
        wrapper
    ]
}