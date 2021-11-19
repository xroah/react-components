import * as React from "react"
import {states, UNMOUNTED} from "./constants"

export type stateType = (typeof states)[number]
export type Callback = (node?: HTMLElement) => void

type ChildrenFunc = (
    state: Exclude<stateType, typeof UNMOUNTED>
) => React.ReactElement

type Callbacks<T extends readonly string[]> = {
    [K in T[number]]?: Callback
}

const callbacks = [
    "onEnter",
    "onEntering",
    "onEntered",
    "onExit",
    "onExiting",
    "onExited"
] as const

export interface TransitionProps extends Callbacks<typeof callbacks> {
    in: boolean
    timeout?: number
    unmountOnExit?: boolean
    appear?: boolean
    children: ChildrenFunc | React.ReactElement
}

export interface TransitionState {
    status?: stateType
}

export interface NoTransitionProps extends TransitionProps {
    showClass?: string
}

export interface FadeProps extends TransitionProps {
    transitionClass?: string
    activeClass?: string
    hiddenOnExited?: boolean
}

export interface CSSTransitionProps extends TransitionProps {
    name: string
    hiddenOnExited?: boolean
}

export interface Next {
    fn: Function
    timeout: number
}

export interface State {
    status: stateType | typeof UNMOUNTED
}