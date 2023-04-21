import React, { ReactNode } from "react"
import { createRoot, Root } from "react-dom/client"
import Notification, {
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
    getKeys
} from "../utils"

export interface OpenOptions extends Omit<ToastProps, "children"> {
    content?: ReactNode
    key?: string
}

interface Item {
    root: Root
    props: ToastProps
    container: HTMLElement
    close: VoidFunction
}


const tMap = new Map<string, Item>()
const bMap = new Map<string, Item>()
const tlMap = new Map<string, Item>()
const trMap = new Map<string, Item>()
const blMap = new Map<string, Item>()
const brMap = new Map<string, Item>()
const dirMap = new Map<Placement, Map<string, Item>>([
    [TOP, tMap],
    [BOTTOM, bMap],
    [TOP_LEFT, tlMap],
    [TOP_RIGHT, trMap],
    [BOTTOM_LEFT, blMap],
    [BOTTOM_RIGHT, brMap]
])

const wrapperMap = new Map<Placement, HTMLElement | null>([
    ["top-right", null],
    ["top-left", null],
    ["bottom-left", null],
    ["bottom-right", null]
])

function open(
    {
        placement = "bottom-right",
        key,
        ...restProps
    }: OpenOptions = {}
) {
    if (!checkPlacement(placement)) {
        return
    }

    const maps = [
        tMap,
        bMap,
        tlMap,
        trMap,
        blMap,
        brMap
    ]
    const newKey = key ?? generateKey()
    const realPlacement = placementMap.get(placement)!
    const close = () => open({
        key: newKey,
        visible: false,
        placement
    })
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
            visible,
            content,
            onHidden,
            onClose,
            ...rest
        }: OpenOptions
    ): ToastProps => {
        return {
            ...rest,
            visible: visible ?? true,
            children: content,
            placement,
            onHidden: chainFunction(handleHidden, onHidden),
            onClose: chainFunction(close, onClose)
        }
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
                old.props = props
            
                old.root.render(<Notification {...getRenderProps(props)} />)

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

    root.render(<Notification {...props} />)
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
            itemMap.forEach(({close}) => close())
        } else {
            const _keys = getKeys(keys!)

            for (const [key, {close}] of itemMap) {
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
            m.forEach(({close}) => close())
        })

        return
    }

    const _keys = getKeys(keys!)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const [_, m] of dirMap) {
        if (!m.size) {
            continue
        }

        for (const [key, {close}] of m) {
            if (_keys.has(key)) {
                close()
            }
        }
    }
}

export { open, close }