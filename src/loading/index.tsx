import React from "react"
import { createRoot, Root } from "react-dom/client"
import { omit } from "../commons/utils"
import Loading, { LoadingProps } from "./loading"

let wrapper: HTMLElement | null = null

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
    const handleHidden = () => {
        onHidden?.()

        Promise.resolve().then(
            () => {
                root.unmount()
                wrapper?.remove()

                wrapper = null
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

    if (!wrapper) {
        wrapper = document.createElement("div")
        wrapper.classList.add("r-loading-fullscreen")
    }

    if (!wrapper.parentElement) {
        document.body.appendChild(wrapper)
    }

    const root = createRoot(wrapper)

    render(true)

    return close
}

export { show }