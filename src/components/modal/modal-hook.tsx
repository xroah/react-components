import React, { ReactNode } from "react"
import { createPortal } from "react-dom"
import { createShortcut, getCloseCallbacks } from "./modal-methods"
import Modal from "./modal"
import { ModalHookApi, ModalProps, OpenOptions } from "./types"
import { chainFunction } from "../utils"

export function useModal(): [ModalHookApi, ReactNode] {
    const [
        props,
        setProps
    ] = React.useState<OpenOptions | null>(null)
    const [visible, setVisible] = React.useState(false)
    const closed = React.useRef(false)
    const close = () => {
        if (closed.current) {
            return
        }

        closed.current = true

        setProps(p => ({ ...p, visible: false }))
        setVisible(false)
    }
    const open = (options: OpenOptions) => {
        setProps(props => ({
            ...props,
            ...options
        }))
        setVisible(true)
    }
    let el: ReactNode = null

    if (props) {
        const handleHidden = () => setProps(null)
        const handleShow = () => closed.current = false
        const {
            content,
            onShow,
            onHidden,
            ...restProps
        } = props
        const newProps: ModalProps = {
            ...restProps,
            ...getCloseCallbacks(props, close),
            visible,
            children: content,
            onShow: chainFunction(handleShow, onShow),
            onHidden: chainFunction(handleHidden, onHidden)
        }
        el = createPortal(
            <Modal {...newProps} />,
            document.body
        )
    }

    return [
        {
            open,
            close,
            alert: createShortcut("alert", open),
            confirm: createShortcut("confirm", open),
            prompt: createShortcut("prompt", open)
        },
        el
    ]
}