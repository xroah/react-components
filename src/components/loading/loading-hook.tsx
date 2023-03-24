import React, { ReactNode } from "react"
import { createPortal } from "react-dom"
import Loading, { LoadingProps } from "./loading"
import { WRAPPER_CLASS } from "./loading-methods"
import { HookApi } from "../commons/types"
import { chainFunction, classnames } from "../utils"

export function useLoading(): [HookApi<LoadingProps>, ReactNode] {
    const [
        props,
        setProps
    ] = React.useState<LoadingProps | null>(null)
    const closed = React.useRef(false)
    const open = (newProps: LoadingProps) => {


        setProps(
            props => ({
                ...props,
                ...newProps
            })
        )
    }
    const close = () => {
        if (closed.current) {
            return
        }

        closed.current = true

        open({ visible: false })
    }
    let el: ReactNode = null

    if (props) {
        const classes = classnames(
            props.className,
            WRAPPER_CLASS
        )
        const handleShow = () => closed.current = false
        const handleHidden = () => setProps(null)
        const newProps: LoadingProps = {
            ...props,
            className: classes,
            visible: props.visible ?? true,
            onShow: chainFunction(handleShow, props.onShow),
            onHidden: chainFunction(handleHidden, props.onHidden),
            onClose: chainFunction(close, props.onClose)
        }
        el = createPortal(
            <Loading {...newProps} />,
            document.body
        )
    }

    return [{ open, close }, el]
}