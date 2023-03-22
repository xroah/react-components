import React, { ReactNode } from "react"
import { createPortal } from "react-dom"
import Loading, { LoadingProps } from "./loading"
import { WRAPPER_CLASS } from "./loading-methods"
import { HookApi } from "../commons/types"
import { classnames } from "r-layers/utils"

export function useLoading(): [HookApi<LoadingProps>, ReactNode] {
    const [
        props,
        setProps
    ] = React.useState<LoadingProps | null>(null)
    const closed = React.useRef(false)
    const open = (
        {
            visible,
            onClose,
            onShow,
            onHidden,
            ...restProps
        }: LoadingProps
    ) => {
        const handleShow = () => {
            closed.current = false
            onShow?.()
        }
        const handleHidden = () => {
            setProps(null)
            onHidden?.()
        }
        const handleClose = () => {
            close()
            onClose?.()
        }

        setProps(
            props => ({
                ...props,
                ...restProps,
                visible: visible ?? true,
                onShow: handleShow,
                onHidden: handleHidden,
                onClose: handleClose
            })
        )
    }
    const close = () => {
        if (closed.current) {
            return
        }

        open({ visible: false })
    }
    let el: ReactNode = null

    if (props) {
        props.className = classnames(
            props.className,
            WRAPPER_CLASS
        )
        el = createPortal(
            <Loading {...props} />,
            document.body
        )
    }

    return [{ open, close }, el]
}