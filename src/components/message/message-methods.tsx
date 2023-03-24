import React, { ReactNode } from "react"
import { createRoot, Root } from "react-dom/client"
import Message, { MessageProps, WRAPPER_CLASS } from "./message"
import XFill from "../icons/x-fill"
import { Variant } from "../commons/types"
import InfoFill from "../icons/info-fill"
import CheckFill from "../icons/check-fill"
import WarnFill from "../icons/warn-fill"
import {
    wrapCloseFunc,
    getDynamicWrapper,
    getKeys,
    isUndef,
    unmountAsync,
    chainFunction
} from "../utils"

export interface OpenOptions extends MessageProps {
    content?: ReactNode
    key?: string
}

interface MapItem {
    root: Root,
    container: HTMLElement
    props: OpenOptions
    close: VoidFunction
}

let uuid = 0
let wrapper: HTMLElement | null = null

const messageMap = new Map<string, MapItem>()

export function generateKey() {
    return `r-message-${uuid++}`
}

function open(
    {
        key,
        ...restProps
    }: OpenOptions
) {
    const newKey = key ?? generateKey()
    const close = wrapCloseFunc(() => {
        open({
            key: newKey,
            visible: false
        })
    })
    const handleHidden = () => {
        const item = messageMap.get(newKey)

        if (!item) {
            return
        }

        unmountAsync(
            item.root,
            () => {
                messageMap.delete(newKey)
                item.container.remove()

                if (messageMap.size === 0) {
                    wrapper?.remove()

                    wrapper = null
                }
            }
        )
    }
    const getRenderProps = (o: OpenOptions): MessageProps => {
        const {
            visible,
            content,
            children,
            onHidden,
            onClose,
            ...rest
        } = o

        return {
            visible: visible ?? true,
            children: content ?? children,
            onHidden: chainFunction(handleHidden, onHidden),
            onClose: chainFunction(close, onClose),
            ...rest
        }
    }
    const update = () => {
        const item = messageMap.get(key!)!
        const newProps = {
            ...item.props,
            ...restProps
        }
        item.props = newProps

        return item.root.render(
            <Message {...getRenderProps(newProps)} />
        )
    }

    if (!messageMap.has(newKey)) {
        const container = document.createElement("div")
        const root = createRoot(container)
        wrapper = getDynamicWrapper(wrapper, WRAPPER_CLASS)
        wrapper.appendChild(container)
        const props = {
            key: newKey,
            ...restProps
        }

        messageMap.set(
            newKey,
            {
                root,
                container,
                props,
                close
            }
        )
        root.render(<Message {...getRenderProps(props)} />)

        return close
    }

    update()

    return messageMap.get(newKey)!.close
}

function createShortcut(variant: Variant, defaultIcon: ReactNode) {
    type Options = Omit<MessageProps, "variant" | "content">

    return (msg: ReactNode, options: Options = {}) => {
        const {
            icon = defaultIcon,
            ...restOptions
        } = options

        return open(
            {
                ...restOptions,
                icon,
                content: msg,
                variant
            }
        )
    }
}

function close(keys?: string | string[]) {
    // close all
    if (isUndef(keys)) {
        messageMap.forEach(item => item.close())
    }

    const _keys = getKeys(keys!)

    for (const [key, item] of messageMap) {
        if (_keys.includes(key)) {
            item.close()
        }
    }
}

function closeAll() {
    close()
}

const error = createShortcut("danger", <XFill />)
const info = createShortcut("info", <InfoFill />)
const success = createShortcut("success", <CheckFill />)
const warn = createShortcut("warning", <WarnFill />)

export {
    open,
    error,
    info,
    success,
    warn,
    close,
    closeAll
}
