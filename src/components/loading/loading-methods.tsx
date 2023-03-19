import React from "react"
import { createRoot } from "react-dom/client"
import { wrapCloseFunc, getDynamicWrapper, unmountAsync } from "../utils"
import Loading, { LoadingProps } from "./loading"

let wrapper: HTMLElement | null = null
let closeFunc: VoidFunction | null = null

export const WRAPPER_CLASS = "r-loading-fullscreen"

function show(
    {
        closable,
        className,
        animation,
        variant,
        size,
        style,
        visible,
        onShow,
        onShown,
        onHide,
        onHidden
    }: LoadingProps = {}
) {
    // prev loading still showing
    if (closeFunc) {
        return closeFunc
    }

    const handleHidden = () => {
        onHidden?.()
        unmountAsync(
            root,
            () => {
                wrapper?.remove()

                wrapper = closeFunc = null
            }
        )
    }
    const render = (visible: boolean) => {
        const props = {
            closable,
            className,
            animation,
            variant,
            size,
            onShow,
            onShown,
            onHide,
            onHidden: handleHidden,
            style
        }

        root?.render(
            <Loading
                visible={visible}
                onClose={close}
                {...props} />
        )
    }
    const close = closeFunc = wrapCloseFunc(() => render(false))
    wrapper = getDynamicWrapper(wrapper, WRAPPER_CLASS)
    const root = createRoot(wrapper)

    render(visible ?? true)

    return close
}

export { show }