import {actions, aliments, placements, verticalAlign} from "./constants"

export type ValueOf<T extends readonly any[]> = T[number]

export type Trigger = ValueOf<typeof actions>

export type Delay = number | {
    show?: number
    hide?: number
}

export type Offset = number | {
    x?: number
    y?: number
}

export interface CommonProps {
    alignment?: ValueOf<typeof aliments>
    placement?: ValueOf<typeof placements>
    verticalAlign?: ValueOf<typeof verticalAlign>
    forceRender?: boolean
    mountNode?: null | string | HTMLElement
    offset?: Offset
    delay?: Delay
    visible?: boolean
    overlayRef?: React.RefObject<Element>
    animation?: boolean
}

export interface PopupProps extends CommonProps {
    children: React.ReactElement
    overlay?: React.ReactNode
    trigger?: Trigger | Trigger[]
}

export interface PopupState {
    visible: boolean
    x: number
    y: number
    mountNode: null | HTMLElement
}

export interface AlignmentProps extends CommonProps {
    getElements: () => ({
        relatedTarget: null | Element
        overlay: null | Element
    })
    children: React.ReactElement
    container?: HTMLElement
}

export interface InnerProps extends CommonProps {
    getTarget: () => Element | null
    onMouseEnter?: (evt: React.MouseEvent) => void
    onMouseLeave?: (evt: React.MouseEvent) => void
}

export interface InnerState {
    left: number
    top: number
}
