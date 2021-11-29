import {actions, aliments, placements} from "./constants"

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
    forceRender?: boolean
    mountNode?: null | string | HTMLElement
    offset?: Offset
    delay?: Delay
    visible?: boolean
    overlayRef?: React.RefObject<Element>
    animation?: boolean
}