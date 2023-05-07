import React from "react"
import { createRoot } from "react-dom/client"
import {
    getDynamicWrapper,
    unmountAsync,
    chainFunction,
    removeNode,
    wrapCloseFunc
} from "../utils"
import Loading, { LoadingProps } from "./loading"

export const WRAPPER_CLASS = "r-loading-fullscreen"
export type Options = Omit<LoadingProps, "onClose" | "visible">

const closeFuncSet = new Set<VoidFunction>()

export function open(options: Options = {}) {
    let props = {
        ...options,
        visible: true
    }
    const wrapper = getDynamicWrapper(null, WRAPPER_CLASS)
    const root = createRoot(wrapper)
    const handleHidden = () => {
        unmountAsync(
            root,
            () => {
                removeNode(wrapper)
                closeFuncSet.delete(close)
                console.log(closeFuncSet.size)
            }
        )
    }
    const render = () => {
        const newProps = {
            ...props,
            onClose: close,
            onHidden: chainFunction(handleHidden, props.onHidden)
        }

        root.render(<Loading {...newProps} />)
    }
    const update = (options: Options = {}) => {
        props = {
            ...props,
            ...options,
            visible: true
        }

        render()
    }
    const close = wrapCloseFunc(() => {
        props.visible = false

        render()
    })

    closeFuncSet.add(close)
    render()

    return { update, close }
}

export function closeAll() {
    for (const c of closeFuncSet) {
        c()
    }
}
