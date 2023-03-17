import React, { ReactNode } from "react"
import { createPortal } from "react-dom"
import { getCloseCallbacks } from "./modal-methods"
import { HookApi } from "../commons/types"
import Modal from "./modal"
import { ModalProps, OpenOptions } from "./types"

export function useModal(): [HookApi<OpenOptions>, ReactNode] {
    const [
        props,
        updateModal
    ] = React.useState<ModalProps | null>(null)
    const modalClosed = React.useRef(false)
    const close = () => {
        if (modalClosed.current) {
            return
        }

        modalClosed.current = true

        open({ visible: false })
    }
    const open = (
        {
            content,
            children,
            visible = true,
            onOk,
            onCancel,
            onClose,
            onShow,
            onHidden,
            ...restProps
        }: OpenOptions
    ) => {
        const handleHidden = () => {
            updateModal(null)
            onHidden?.()
        }
        const handleShow = () => {
            onShow?.()

            modalClosed.current = false
        }

        updateModal({
            ...props,
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
    const modal = <Modal {...props} />

    return [
        { open, close },
        props ? createPortal(modal, document.body) : null
    ]
}