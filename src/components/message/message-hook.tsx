import React, { ReactNode } from "react"
import { createPortal } from "react-dom"
import Message, { MessageProps, WRAPPER_CLASS } from "./message"
import { HookApi } from "../commons/types"
import { isUndef } from "../utils"

let uuid = 0

export interface OpenOptions extends MessageProps {
    content?: ReactNode
    key?: string
}

const propsArray: OpenOptions[] = []

export function useMessage(): [HookApi<OpenOptions>, ReactNode] {
    const ref = React.useRef<HTMLDivElement>(null)
    // for triggering update
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, update] = React.useState(0)
    const reRender = () => update(Math.random())
    const open = (
        {
            content,
            children,
            key,
            visible,
            ...restProps
        }: OpenOptions
    ) => {
        const _children = content ?? children
        if (!isUndef(key)) {
            const existIndex = propsArray.findIndex(
                props => props.key === key
            )

            // update the message
            if (existIndex > -1) {
                const exist = propsArray[existIndex]
                exist.visible = visible ?? exist.visible
                exist.children = _children ?? exist.children
                
                propsArray[existIndex] = {
                    ...exist,
                    ...restProps
                }

                return reRender()
            }
        }

        const newKey = key ?? `r-message-${uuid++}`

        propsArray.push({
            key: newKey,
            visible: visible ?? true,
            children: _children,
            ...restProps,
        })
        reRender()
    }
    const close = (key?: string) => {
        const toBeClosed = propsArray.find(
            props => props.key === key
        )

        if (toBeClosed) {
            toBeClosed.visible = false

            reRender()
        }
    }
    const del = (key?: string) => {
        const len = propsArray.length

        for (let i = 0; i < len; i++) {
            const props = propsArray[i]

            if (props.key === key) {
                propsArray.splice(i, 1)
                reRender()

                break
            }
        }
    }
    const closeMsg = (keys?: string | string[]) => {
        if (!propsArray.length) {
            return
        }

        // close all
        if (isUndef(keys)) {
            propsArray.forEach(props => props.visible = false)

            return reRender()
        }

        let _keys: string[] = []
        let shouldReRender = false

        if (!Array.isArray(keys)) {
            _keys = [keys!]
        } else {
            _keys = keys
        }

        propsArray.forEach(props => {
            if (_keys.includes(props.key!)) {
                shouldReRender = true
                props.visible = false
            }
        })

        if (shouldReRender) {
            reRender()
        }
    }
    const children = propsArray.map(({
        onClose,
        onHidden,
        key,
        ...restProps
    }) => {
        const handleClose = () => {
            close(key)

            onClose?.()
        }
        const handleHidden = () => {
            del(key)

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

    return [{ open, close: closeMsg }, wrapper]
}