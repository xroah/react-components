import React, { ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Message, { WRAPPER_CLASS } from "./message"
import { Variant } from "../commons/types"
import XFill from "../icons/x-fill"
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
import {
    MapItem,
    MessageProps,
    OpenFunc,
    OpenOptions,
    Shortcut,
    ShortcutOptions
} from "./types"

let uuid = 0
let wrapper: HTMLElement | null = null

const messageMap = new Map<string, MapItem>()

function generateKey() {
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
            onHidden,
            onClose,
            ...rest
        } = o

        return {
            ...rest,
            visible: visible ?? true,
            children: content,
            onHidden: chainFunction(handleHidden, onHidden),
            onClose: chainFunction(close, onClose)
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

function createShortcut(
    variant: Variant,
    defaultIcon: ReactNode,
    openFunc: OpenFunc = open
) {
    return (msg: ReactNode, options: ShortcutOptions = {}) => {
        const {
            icon = defaultIcon,
            ...restOptions
        } = options

        return openFunc(
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
        if (_keys.has(key)) {
            item.close()
        }
    }
}

function closeAll() {
    close()
}

const error = createShortcut("danger", <XFill />) as Shortcut
const info = createShortcut("info", <InfoFill />) as Shortcut
const success = createShortcut("success", <CheckFill />) as Shortcut
const warn = createShortcut("warning", <WarnFill />) as Shortcut

export {
    open,
    error,
    info,
    success,
    warn,
    close,
    closeAll,
    // internal
    createShortcut,
    generateKey
}
