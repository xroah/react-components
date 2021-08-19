import {
    ENTER,
    ENTERED,
    ENTERING,
    EXIT,
    EXITING,
    EXITED,
    UNMOUNTED
} from "./constants"

const states = [
    ENTER,
    ENTERING,
    ENTERED,
    EXIT,
    EXITING,
    EXITED,
    UNMOUNTED
] as const
export type stateType = (typeof states)[number]
export type componentState = stateType | typeof UNMOUNTED
export type callback = () => void

export interface TransitionProps {
    in: boolean
    timeout?: number
    unmountOnExit?: boolean
    appear?: boolean
    children: ((state: stateType) => React.ReactElement) | React.ReactElement
    onEnter?: callback
    onEntering?: callback
    onEntered?: callback
    onExit?: callback
    onExiting?: callback
    onExited?: callback
}

export interface TransitionState {
    status?: componentState
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
