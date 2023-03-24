import React from "react"
import { Root, createRoot } from "react-dom/client"
import {
    wrapCloseFunc,
    getDynamicWrapper,
    unmountAsync,
    classnames,
    chainFunction,
    removeNode
} from "../utils"
import Loading, { LoadingProps } from "./loading"

let wrapper: HTMLElement | null = null
let root: Root | null = null
let props: LoadingProps = {}

export const WRAPPER_CLASS = "r-loading-fullscreen"

function open(
    {
        className,
        visible,
        onHidden,
        onClose,
        ...restProps
    }: LoadingProps = {}
) {
    props = {
        className: classnames(className, WRAPPER_CLASS),
        // maybe update, get props.visible first
        visible: props.visible ?? visible ?? true,
        ...restProps
    }
    const handleHidden = () => {
        unmountAsync(
            root!,
            () => {
                removeNode(
                    wrapper,
                    () => {
                        wrapper = root = null
                        props = {}
                    }
                )
            }
        )
    }
    const render = () => {
        props.onClose = onClose ?? props.onClose
        props.onHidden = onHidden ?? props.onHidden
        const newProps = {
            ...props,
            onClose: chainFunction(close, onClose),
            onHidden: chainFunction(handleHidden, onHidden)
        }

        root?.render(<Loading {...newProps} />)
    }
    const close = wrapCloseFunc(
        () => {
            props.visible = false

            render()
        }
    )

    //can open only one loading, if root is not null, just update
    if (!root) {
        wrapper = getDynamicWrapper(wrapper, WRAPPER_CLASS)
        root = createRoot(wrapper)
    }

    render()

    return close
}

export { open }