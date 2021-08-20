import {states, UNMOUNTED} from "./constants"


export type stateType = (typeof states)[number]
export type callback = () => void

type ChildrenFunc = (
    state: Exclude<stateType, typeof UNMOUNTED>
) => React.ReactElement

export interface TransitionProps {
    in: boolean
    timeout?: number
    unmountOnExit?: boolean
    appear?: boolean
    children: ChildrenFunc | React.ReactElement
    onEnter?: callback
    onEntering?: callback
    onEntered?: callback
    onExit?: callback
    onExiting?: callback
    onExited?: callback
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
