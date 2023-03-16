import React, { ReactNode } from "react"
import { createPortal } from "react-dom"
import Modal from "./modal"
import { getCloseCallbacks } from "./modal-methods"
import { HookReturn, ModalProps, OpenFunc } from "./types"

export function useModal(): HookReturn {
    let props: ModalProps = {}
    const [modal, updateModal] = React.useState<ReactNode>()
    const modalClosed = React.useRef(false)
    const close = React.useCallback(
        () => {
            if (modalClosed.current) {
                return
            }

            open({
                ...props,
                visible: false
            })
        },
        [modal]
    )
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
        props = {
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
            onHidden: handleHidden
        }
        const el = (
            <Modal {...props}>
                {content ?? children}
            </Modal>
        )

        updateModal(el)
    }

    return [
        { open, close },
        modal ? createPortal(modal, document.body) : null
    ]
}