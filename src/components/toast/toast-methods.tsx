import React, { ReactNode } from "react"
import { createRoot, Root } from "react-dom/client"
import Toast, {
    BOTTOM_LEFT,
    BOTTOM_RIGHT,
    checkPlacement,
    CLASS_PREFIX,
    ToastProps,
    Placement,
    placementMap,
    TOP_LEFT,
    TOP_RIGHT,
    TOP,
    BOTTOM
} from "./toast"
import {
    isUndef,
    generateKey,
    getDynamicWrapper,
    unmountAsync,
    chainFunction,
    getKeys,
    wrapCloseFunc
} from "../utils"
import XFill from "../icons/x-fill"
import { Variant } from "r-layers/commons/types"
import CheckFill from "r-layers/icons/check-fill"
import WarnFill from "r-layers/icons/warn-fill"
import InfoFill from "r-layers/icons/info-fill"

export interface OpenOptions extends Omit<ToastProps, "children"> {
    content?: ReactNode
    key?: string
}

export interface OpenMsgFunc {
    (c: ReactNode, opts?: OpenOptions): VoidFunction | void
}

type MethodOptions = Omit<OpenOptions, "onClose" | "visible">

interface Item {
    root: Root
    props: ToastProps
    container: HTMLElement
    close: VoidFunction
}

const getItemMap = () => new Map<string, Item>()
const dirMap = new Map<Placement, Map<string, Item>>([
    [TOP, getItemMap()],
    [BOTTOM, getItemMap()],
    [TOP_LEFT, getItemMap()],
    [TOP_RIGHT, getItemMap()],
    [BOTTOM_LEFT, getItemMap()],
    [BOTTOM_RIGHT, getItemMap()]
])

const wrapperMap = new Map<Placement, HTMLElement | null>([])

function open(
    {
        placement = "bottom-right",
        key,
        ...restProps
    }: MethodOptions = {}
) {
    if (!checkPlacement(placement)) {
        return
    }

    const maps = dirMap.values()
    const newKey = key ?? generateKey()
    const realPlacement = placementMap.get(placement)!
    const handleHidden = () => {
        const realMap = dirMap.get(realPlacement)!
        const item = realMap.get(newKey)

        if (!item) {
            return
        }

        unmountAsync(
            item.root,
            () => {
                realMap.delete(newKey)
                item.container.remove()

                if (!realMap.size) {
                    const wrapper = wrapperMap.get(realPlacement)

                    wrapper?.remove()
                    wrapperMap.set(realPlacement, null)
                }
            }
        )
    }
    const getRenderProps = (
        {
            content,
            onHidden,
            ...rest
        }: MethodOptions
    ): ToastProps => {
        return {
            ...rest,
            children: content,
            placement,
            onHidden: chainFunction(handleHidden, onHidden),
        }
    }
    const render = (
        root: Root,
        props: ToastProps,
        visible: boolean
    ) => {
        props.visible = visible

        root.render(<Toast {...props} />)
    }

    if (!isUndef(newKey)) {
        for (const map of maps) {
            if (map.has(newKey)) {
                // update
                const old = map.get(newKey)!
                const props: ToastProps = {
                    ...old.props,
                    ...restProps
                }
                const finalProps = getRenderProps(props)
                const close = wrapCloseFunc(
                    () => render(old.root, finalProps, false)
                )
                old.props = props
                old.close = close

                render(
                    old.root,
                    { ...finalProps, onClose: close },
                    true
                )

                return close
            }
        }
    }

    let wrapper = wrapperMap.get(realPlacement)

    if (!wrapper) {
        wrapper = getDynamicWrapper(
            wrapper as null,
            [CLASS_PREFIX, `${CLASS_PREFIX}-${realPlacement}`]
        )

        wrapperMap.set(realPlacement, wrapper)
    }

    const container = document.createElement("div")
    const root = createRoot(container)
    const props = getRenderProps(restProps)
    const close = () => render(root, props, false)

    render(root, { ...props, onClose: close }, true)
    wrapper.appendChild(container)
    dirMap.get(realPlacement)!.set(
        newKey,
        {
            container,
            root,
            props,
            close
        }
    )

    return close
}

function close(keys?: string | string[], placement?: Placement) {
    if (!isUndef(placement)) {
        if (!checkPlacement(placement!)) {
            return
        }

        const realPlacement = placementMap.get(placement!)!
        const itemMap = dirMap.get(realPlacement)!

        if (isUndef(keys)) {
            // close all of the real placement
            itemMap.forEach(({ close }) => close())
        } else {
            const _keys = getKeys(keys!)

            for (const [key, { close }] of itemMap) {
                if (_keys.has(key)) {
                    close()
                }
            }
        }

        return
    }

    if (isUndef(keys)) {
        // close all directions
        dirMap.forEach(m => {
            m.forEach(({ close }) => close())
        })

        return
    }

    const _keys = getKeys(keys!)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const [_, m] of dirMap) {
        if (!m.size) {
            continue
        }

        for (const [key, { close }] of m) {
            if (_keys.has(key)) {
                close()
            }
        }
    }
}

function openMessage(content: ReactNode, options?: OpenOptions) {
    return open({
        content,
        ...options,
        placement: options?.placement ?? "top",
        simple: true
    })
}

function factory(
    variant: Variant,
    openFunc: OpenMsgFunc = openMessage,
) {
    return (content: ReactNode, options?: OpenOptions) => {
        const defaultIconMap = new Map<Variant, ReactNode>([
            ["danger", <XFill key="x-fill" />],
            ["success", <CheckFill key="check-fill" />],
            ["warning", <WarnFill key="warn-fill" />],
            ["info", <InfoFill key="info-fill" />]
        ])

        return openFunc(
            content,
            {
                ...options,
                icon: options?.icon ?? defaultIconMap.get(variant),
                variant
            }
        )
    }
}

const openErrorMessage = factory("danger")
const openSuccessMessage = factory("success")
const openWarnMessage = factory("warning")
const openInfoMessage = factory("info")

export {
    open,
    close,
    openMessage,
    openErrorMessage,
    openInfoMessage,
    openWarnMessage,
    openSuccessMessage,
    factory
}