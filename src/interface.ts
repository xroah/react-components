import React from "react"
import {TransitionProps} from "reap-transition/lib/Transition"

export type position = "top" | "right" | "bottom" | "left"
export type action = "hover" | "click" | "focus"
export type trigger = action[] | action

export interface PopupCommonProps {
    placement?: position
    visible?: boolean
    popupMountNode?: HTMLElement | string | null
    offset?: number | number[]
    defaultVisible?: boolean
    transition?: React.FunctionComponent<any> | typeof React.Component | null
    transitionProps?: TransitionProps
    forceRender?: boolean
    onShow?: Function
    onShown?: Function
    onHide?: Function
    onHidden?: Function
}

export interface Position {
    left: number
    top: number
}

export interface PopupState {
    arrowPos: Position
    placement?: position
    left?: number
    top?: number
    exited?: boolean
}

export interface PopupProps extends PopupCommonProps {
    alignment?: "left" | "center" | "right"
    //below props are internal temporarily
    unmountOnExit?: boolean
    target?: HTMLElement | null//calc position based on this element
    verticalCenter?: boolean
    onClickOutside?: Function
    elRef?: React.RefObject<HTMLElement>
    onMouseEnter?: React.MouseEventHandler<HTMLElement>
    onMouseLeave?: React.MouseEventHandler<HTMLElement>
}

export interface DelayObject {
    show?: number
    hide?: number
}

export interface CommonProps extends PopupCommonProps {
    trigger?: trigger
    delay?: number | DelayObject
}

export interface OverlayProps<T> extends CommonProps, PopupProps {
    popup: React.ReactNode
    popupProps?: React.HTMLAttributes<HTMLElement>
    extraRender?: (overlay: T) => JSX.Element
    closeOnClickOutSide?: boolean
}

export interface OverlayState {
    visible: boolean
    node: HTMLElement | null
}

export interface SpareSpace {
    top: number
    bottom: number
    left: number
    right: number
}

export interface BaseAlignment {
    top: number
    left: number
    parent: HTMLElement
}

export interface Alignment {
    left: number
    top: number
    placement: position
}