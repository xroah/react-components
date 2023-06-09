import { ReactElement, RefObject } from "react"
import { ToggleEvents } from "../commons/types"
import { ComputePositionReturn, Placement } from "@floating-ui/dom"

export interface PopupProps extends ToggleEvents {
    overlay: ReactElement
    anchorRef?: RefObject<HTMLElement>
    flipAlignment?: boolean
    className?: string
    arrowRef?: RefObject<HTMLElement>
    children: ReactElement
    offset?: number | number[]
    flip?: boolean
    transition?: boolean
    transitionClass?: string
    timeout?: number
    placement?: Placement
    visible?: boolean
    fallbackPlacements?: Placement[]
    unmountOnHidden?: boolean
    forceRender?: boolean
    onClickOutSide?: (e: MouseEvent) => void
    onUpdate?: (data: ComputePositionReturn) => void
}

type CommonProps = { [index: string]: unknown }
type PropsType = Partial<PopupProps> & CommonProps

export function extractPopupProps(props: PropsType) {
    const keys = new Set([
        "visible",
        "transition",
        "transitionClass",
        "offset",
        "anchorRef",
        "children",
        "overlay",
        "timeout",
        "fallbackPlacements",
        "arrowRef",
        "flipAlignment",
        "flip",
        "placement",
        "unmountOnHidden",
        "forceRender",
        "className",
        "onUpdate",
        "onShow",
        "onShown",
        "onHide",
        "onHidden"
    ])
    const popupProps: Partial<PopupProps> = {}
    const otherProps: CommonProps = {}
    const realKeys = Object.keys(props)
    type PopupKey = keyof PopupProps

    for (const key of realKeys) {
        if (keys.has(key)) {
            (
                popupProps[key as PopupKey] as PopupProps[PopupKey]
            ) = props[key as PopupKey]
        } else {
            otherProps[key] = props[key]
        }
    }

    return {
        popupProps: popupProps as PopupProps,
        otherProps
    }
}

export function getOffset(offset?: number | number[]) {
    if (offset) {
        if (Array.isArray(offset)) {
            if (!offset.length) {
                return false
            }

            if (offset.length === 1) {
                return [offset[0], offset[0]]
            }

            return offset
        }

        return [offset, offset]
    }

    return false
}