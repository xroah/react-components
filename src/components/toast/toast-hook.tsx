import React, {
    Dispatch,
    ReactNode,
    SetStateAction,
    useMemo,
    useState
} from "react"
import Toast, {
    BOTTOM_LEFT,
    BOTTOM_RIGHT,
    checkPlacement,
    placementMap,
    TOP_LEFT,
    TOP_RIGHT,
    Placement,
    CLASS_PREFIX,
    TOP,
    BOTTOM
} from "./toast"
import { OpenOptions } from "./toast-methods"
import { chainFunction, generateKey, getKeys, isUndef } from "../utils"
import { createPortal } from "react-dom"
import { HookApi } from "r-layers/commons/types"

interface HookOptions extends OpenOptions {
    _onHidden?: VoidFunction
    _onClose?: VoidFunction
}

type SetFunc = Dispatch<SetStateAction<HookOptions[]>>

interface NotificationHookApi extends Omit<HookApi<OpenOptions>, "close"> {
    close: (keys: string | string[], p: Placement) => void
}

function closeOne(key: string, set: SetFunc) {
    set(
        items => {
            for (const item of items) {
                if (item.key === key) {
                    item.visible = false
                    break
                }
            }

            return [...items]
        }
    )
}

function delOne(
    key: string,
    set: SetFunc
) {
    set(
        items => {
            const len = items.length

            for (let i = 0; i < len; i++) {
                const item = items[i]

                if (item.key === key) {
                    items.splice(i, 1)

                    break
                }
            }

            return [...items]
        }
    )
}

export function useNotification(): [NotificationHookApi, ReactNode] {
    const [tItems, setTItems] = useState<HookOptions[]>([])
    const [bItems, setBItems] = useState<HookOptions[]>([])
    const [tlItems, setTlItems] = useState<HookOptions[]>([])
    const [trItems, setTrItems] = useState<HookOptions[]>([])
    const [blItems, setBlItems] = useState<HookOptions[]>([])
    const [brItems, setBrItems] = useState<HookOptions[]>([])
    const setFuncMap = useMemo(
        () => {
            return new Map([
                [TOP, setTItems],
                [BOTTOM, setBItems],
                [TOP_LEFT, setTlItems],
                [TOP_RIGHT, setTrItems],
                [BOTTOM_LEFT, setBlItems],
                [BOTTOM_RIGHT, setBrItems]
            ])
        },
        []
    )
    const close = (key: string, placement: Placement) => {
        closeOne(key, setFuncMap.get(placement)!)
    }
    const del = (key: string, placement: Placement) => {
        delOne(key, setFuncMap.get(placement)!)
    }
    const open = (
        {
            key,
            placement = "bottom-right",
            ...rest
        }: OpenOptions
    ) => {
        if (!checkPlacement(placement)) {
            return
        }

        const newKey = key ?? generateKey()
        const realPlacement = placementMap.get(placement)!
        let index = -1
        let newOptions: HookOptions = {}

        setFuncMap.get(realPlacement)!(
            items => {
                if (!isUndef(key)) {
                    const existIndex = items.findIndex(
                        item => item.key === key
                    )

                    // update
                    if (existIndex > -1) {
                        index = existIndex
                        newOptions = {
                            ...items[existIndex],
                            ...rest
                        }
                    }
                }

                if (index === -1) {
                    index = items.length
                    newOptions = {
                        placement: realPlacement,
                        key: newKey,
                        ...rest
                    }
                }

                newOptions._onHidden = chainFunction(
                    () => del(newKey, realPlacement),
                    newOptions.onHidden
                )
                newOptions._onClose = chainFunction(
                    () => close(newKey, realPlacement),
                    newOptions._onClose
                )
                items[index] = newOptions

                return [...items]
            }
        )
    }
    const closeAll = (
        keys?: string | string[],
        placement?: Placement
    ) => {
        const _closeAll = (items: HookOptions[]) => items.map(
            item => {
                item.visible = false

                return item
            }
        )
        const _closeByKeys = (
            items: HookOptions[],
            keys: Set<string>
        ) => {
            return items.map(
                item => {
                    if (keys.has(item.key!)) {
                        item.visible = false
                    }

                    return item
                }
            )
        }
        if (!isUndef(placement)) {
            if (!checkPlacement(placement!)) {
                return
            }

            const realPlacement = placementMap.get(placement!)!
            setFuncMap.get(realPlacement)!(
                items => {
                    if (isUndef(keys)) {
                        return _closeAll(items)
                    }

                    return _closeByKeys(items, getKeys(keys!))
                }
            )

            return
        }

        if (isUndef(keys)) {
            // close all directions
            setFuncMap.forEach(set => set(_closeAll))

            return
        }

        setFuncMap.forEach(
            set => set(
                items => _closeByKeys(items, getKeys(keys!))
            )
        )
    }
    const genChildren = (
        items: HookOptions[],
        placement: Placement
    ) => {
        if (!items.length) {
            return null
        }

        const classes = `${CLASS_PREFIX} ${CLASS_PREFIX}-${placement}`
        const el = (
            <div className={classes}>
                {
                    items.map(
                        ({
                            key,
                            visible,
                            content,
                            _onClose,
                            _onHidden,
                            ...rest
                        }) => {
                            rest.onHidden = _onHidden
                            rest.onClose = _onClose

                            return (
                                <Toast
                                    key={key}
                                    visible={visible ?? true}
                                    {...rest} >
                                    {content}
                                </Toast>
                            )
                        }
                    )
                }
            </div>
        )

        return createPortal(el, document.body)
    }
    const els = (
        <>
            {genChildren(tItems, TOP)}
            {genChildren(bItems, BOTTOM)}
            {genChildren(tlItems, TOP_LEFT)}
            {genChildren(trItems, TOP_RIGHT)}
            {genChildren(blItems, BOTTOM_LEFT)}
            {genChildren(brItems, BOTTOM_RIGHT)}
        </>
    )

    return [{ open, close: closeAll }, els]
}