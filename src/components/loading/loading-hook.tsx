import React, { ReactNode } from "react"
import { createPortal } from "react-dom"
import Loading, { LoadingProps } from "./loading"
import { WRAPPER_CLASS } from "./loading-methods"

type OpenFunc = (options: LoadingProps) => void

type HookApi = {
    open: OpenFunc,
    close: VoidFunction
}

export function useLoading(): [HookApi, ReactNode] {
    const [
        props,
        updateLoading
    ] = React.useState<LoadingProps | null>(null)
    const closed = React.useRef(false)
    const open: OpenFunc = ({
        visible,
        onClose,
        onShow,
        onHidden,
        ...restProps
    }) => {
        const handleShow = () => {
            closed.current = false
            
            onShow?.()
        }
        const handleHidden = () => {
            updateLoading(null)
            
            onHidden?.()
        }
        const handleClose = () => {
            close()

            onClose?.()
        }

        updateLoading({
            ...props,
            visible: visible ?? true,
            onShow: handleShow,
            onHidden: handleHidden,
            onClose: handleClose,
            ...restProps
        })
    }
    const close = () => {
        if (closed.current) {
            return
        }

        open({visible: false})
    }

    return [
        { open, close },
        props ? createPortal(
            <div className={WRAPPER_CLASS}>
                <Loading {...props} />
            </div>,
            document.body
        ) : null
    ]
}