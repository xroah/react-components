import {
    ENTER,
    ENTERED,
    ENTERING,
    EXIT,
    EXITING,
    EXITED,
    UNMOUNTED
} from "./constants"

export type stateType = typeof ENTER |
    typeof ENTERING |
    typeof ENTERED |
    typeof EXIT |
    typeof EXITING |
    typeof EXITED
export type componentState = stateType | typeof UNMOUNTED
export type callback = (node: HTMLElement | null) => void

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
    status: componentState
}

export interface NoTransitionProps extends TransitionProps {
    activeClass?: string
}

export interface FadeProps extends TransitionProps {
    transitionClass: string
    activeClass: string
}

export interface CSSTransitionProps extends TransitionProps {
    name: string
}