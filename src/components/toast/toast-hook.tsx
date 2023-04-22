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
import {
    OpenOptions,
    OpenMsgFunc,
    factory
} from "./toast-methods"
import {
    chainFunction,
    generateKey,
    getKeys,
    isUndef
} from "../utils"
import { createPortal } from "react-dom"
import { HookApi } from "../commons/types"

type SetFunc = Dispatch<SetStateAction<OpenOptions[]>>

interface ToastHookApi extends Omit<HookApi<OpenOptions>, "close"> {
    close: (keys: string | string[], p: Placement) => void
    openMessage: OpenMsgFunc
    openErrorMessage: OpenMsgFunc
    openSuccessMessage: OpenMsgFunc
    openWarnMessage: OpenMsgFunc
    openInfoMessage: OpenMsgFunc
}

function closeOne(key: string, set: SetFunc) {
    set(items => {
        for (const item of items) {
            if (item.key === key) {
                item.visible = false
                break
            }
        }

        return [...items]
    })
}

function delOne(
    key: string,
    set: SetFunc
) {
    set(
        items => {
            const len = items.length

            for (let i = 0; i < len; i++) {
                if (items[i].key === key) {
                    items.splice(i, 1)
                    break
                }
            }

            return [...items]
        }
    )
}

export function useToast(): [ToastHookApi, ReactNode] {
    const [tItems, setTItems] = useState<OpenOptions[]>([])
    const [bItems, setBItems] = useState<OpenOptions[]>([])
    const [tlItems, setTlItems] = useState<OpenOptions[]>([])
    const [trItems, setTrItems] = useState<OpenOptions[]>([])
    const [blItems, setBlItems] = useState<OpenOptions[]>([])
    const [brItems, setBrItems] = useState<OpenOptions[]>([])
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
        let newOptions: OpenOptions = {}

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

                items[index] = {
                    ...newOptions,
                    visible: true,
                    onClose: () => close(newKey, realPlacement)
                }

                return [...items]
            }
        )
    }
    const openMessage = (
        content: ReactNode,
        options?: OpenOptions
    ) => {
        return open({
            content: content,
            ...options,
            placement: options?.placement ?? "top",
            simple: true
        })
    }
    const closeAll = (
        keys?: string | string[],
        placement?: Placement
    ) => {
        const _closeAll = (items: OpenOptions[]) => items.map(
            item => {
                item.visible = false

                return item
            }
        )
        const _closeByKeys = (
            items: OpenOptions[],
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

        // find items from all placements
        setFuncMap.forEach(
            set => set(
                items => _closeByKeys(items, getKeys(keys!))
            )
        )
    }
    const genChildren = (
        items: OpenOptions[],
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
                            onHidden,
                            ...rest
                        }) => {
                            const _onHidden = chainFunction(
                                () => del(key!, placement),
                                onHidden
                            )

                            return (
                                <Toast
                                    key={key}
                                    visible={visible ?? true}
                                    onHidden={_onHidden}
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

    return [
        {
            open,
            openMessage,
            openErrorMessage: factory("danger", openMessage),
            openSuccessMessage: factory("success", openMessage),
            openWarnMessage: factory("warning", openMessage),
            openInfoMessage: factory("info", openMessage),
            close: closeAll
        },
        els
    ]
}