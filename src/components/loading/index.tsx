import React from "react"
import { createRoot } from "react-dom/client"
import { getDynamicWrapper, omit, unmountAsync } from "../utils"
import Loading, { LoadingProps } from "./loading"

let wrapper: HTMLElement | null = null
let closeFunc: VoidFunction | null = null

interface FullscreenLoadingProps extends LoadingProps {
    visible?: boolean
}

function FullScreenLoading(
    {
        visible,
        ...restProps
    }: FullscreenLoadingProps
) {
    omit(restProps, "loading")

    return <Loading loading={visible} {...restProps} />
}

function show(
    {
        closable,
        className,
        animation,
        variant,
        size,
        onShow,
        onShown,
        style,
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
            <FullScreenLoading
                visible={visible}
                onClose={close}
                {...props} />
        )
    }
    const close = () => render(false)
    closeFunc = close
    wrapper = getDynamicWrapper(wrapper, "r-loading-fullscreen")
    const root = createRoot(wrapper)

    render(true)

    return close
}

export { show }