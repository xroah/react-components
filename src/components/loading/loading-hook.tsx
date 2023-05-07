import React, { ReactNode } from "react"
import { createPortal } from "react-dom"
import Loading, { LoadingProps } from "./loading"
import { Options, WRAPPER_CLASS } from "./loading-methods"
import { HookApi } from "../commons/types"
import { chainFunction } from "../utils"

export function useLoading(): [HookApi<LoadingProps>, ReactNode] {
    const [
        props,
        setProps
    ] = React.useState<LoadingProps | null>(null)
    const closed = React.useRef(false)
    const open = (newProps: Options) => {
        setProps(
            props => ({
                ...props,
                ...newProps,
                visible: true
            })
        )
    }
    const close = () => {
        if (closed.current) {
            return
        }

        closed.current = true

        setProps(p => ({ ...p, visible: false }))
    }
    let el: ReactNode = null

    if (props) {
        const handleShow = () => closed.current = false
        const handleHidden = () => setProps(null)
        const newProps: LoadingProps = {
            ...props,
            visible: props.visible ?? true,
            onShow: chainFunction(handleShow, props.onShow),
            onHidden: chainFunction(handleHidden, props.onHidden),
            onClose: close
        }
        el = createPortal(
            <div className={WRAPPER_CLASS}>
                <Loading {...newProps} />
            </div>,
            document.body
        )
    }

    return [{ open, close }, el]
}