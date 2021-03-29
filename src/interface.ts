import React from "react"
import {TransitionProps} from "reap-transition/lib/Transition"

export type position = "top" | "right" | "bottom" | "left"
export type action = "hover" | "click" | "focus"
export type trigger = action[] | action
type callback = (node: HTMLElement | null) => void

export interface PopupCommonProps {
    placement?: position
    visible?: boolean
    popupMountNode?: HTMLElement | string
    offset?: number | number[]
    transition?: React.FunctionComponent<any> | typeof React.Component | null
    transitionProps?: TransitionProps
    forceRender?: boolean
    alignment?: "left" | "center" | "right",
    onClickOutside?: Function
    elRef?: React.RefObject<HTMLElement>
    verticalCenter?: boolean
    onShow?: callback
    onShown?: callback
    onHide?: callback
    onHidden?: callback
}

export interface PopupProps extends PopupCommonProps {
    //below props are internal temporarily
    target?: HTMLElement | null//calc position based on this element
    onMouseEnter?: React.MouseEventHandler<HTMLElement>
    onMouseLeave?: React.MouseEventHandler<HTMLElement>
}

export interface Position {
    left: number
    top: number
}

export interface PopupState extends Position{
    placement: position
    left: number
    top: number
    exited: boolean
    zIndex: number
}

export interface DelayObject {
    show?: number
    hide?: number
}

export interface OverlayProps<T> extends PopupCommonProps {
    trigger?: trigger
    delay?: number | DelayObject
    popup: React.ReactElement
    popupProps?: React.HTMLAttributes<HTMLElement>
    extraRender?: (overlay: T) => JSX.Element
    closeOnClickOutSide?: boolean
    defaultVisible?: boolean
}

export interface OverlayState {
    visible: boolean
    node: HTMLElement | null
}

export interface SpareSpace extends Position {
    bottom: number
    right: number
}

export interface BaseAlignment extends Position {
    parent: HTMLElement
}

export interface AlignProps {
    placement?: position
    offset?: number | number[]
    target: HTMLElement | null
    alignment?: "left" | "center" | "right"
    verticalCenter?: boolean
    style?: React.CSSProperties,
    className?: string
}