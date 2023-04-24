import React from "react"
import { Root, createRoot } from "react-dom/client"
import {
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

function handleHidden() {
    if (!root) {
        return
    }

    unmountAsync(
        root,
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

function render() {
    const newProps = {
        ...props,
        onClose: chainFunction(close, props.onClose),
        onHidden: chainFunction(handleHidden, props.onHidden),
        visible: props.visible ?? true
    }

    root?.render(<Loading {...newProps} />)
}

function open(
    {
        className,
        ...restProps
    }: LoadingProps = {}
) {
    props = {
        ...props,
        ...restProps,
        visible: true,
        className: classnames(className, WRAPPER_CLASS)
    }

    //can open only one loading, if root is not null, just update
    if (!root) {
        wrapper = getDynamicWrapper(wrapper, WRAPPER_CLASS)
        root = createRoot(wrapper)
    }

    render()

    return close
}

function close() {
    if (props.visible !== true) {
        return
    }

    props.visible = false

    render()
}

export { open, close }