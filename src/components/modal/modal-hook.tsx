import React from "react"
import { createPortal } from "react-dom"
import { getCloseCallbacks } from "./modal-methods"
import { HookReturn, ModalProps, OpenFunc } from "./types"
import Modal from "./modal"

export function useModal(): HookReturn {
    const [props, updateModal] = React.useState<ModalProps | null>(null)
    const modalClosed = React.useRef(false)
    const close = () => {
        if (modalClosed.current) {
            return
        }

        open({
            ...props,
            visible: false
        })
    }
    const open: OpenFunc = ({
        content,
        children,
        visible = true,
        onOk,
        onCancel,
        onClose,
        onShow,
        onHidden,
        ...restProps
    }) => {
        const handleHidden = () => {
            updateModal(null)
            onHidden?.()

            modalClosed.current = true
        }
        const handleShow = () => {
            onShow?.()

            modalClosed.current = false
        }

        updateModal({
            ...restProps,
            ...getCloseCallbacks(
                {
                    onOk,
                    onCancel,
                    onClose
                },
                close
            ),
            visible,
            onShow: handleShow,
            onHidden: handleHidden,
            children: content ?? children
        })
    }
    const modal = <Modal {...props}/>

    return [
        { open, close },
        props ? createPortal(modal, document.body) : null
    ]
}