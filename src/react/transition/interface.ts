import * as React from "react"
import {states, UNMOUNTED} from "./constants"

export type StateType = (typeof states)[number]
export type Callback = (node?: HTMLElement) => void

type ChildrenFunc = (
    state: Exclude<StateType, typeof UNMOUNTED>
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
    onTransitionEnd?: (evt: React.TransitionEvent) => void
}

export interface NoTransitionProps extends TransitionProps {
    showClass?: string
}

export interface FadeProps extends TransitionProps {
    name?: string
    showClass?: string
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
    status: StateType
}