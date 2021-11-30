import {
    actions,
    aliments,
    clickArea,
    placements,
    verticalAlign
} from "./constants"

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

type ClickArea = ValueOf<typeof clickArea>
type AutoClose = boolean | ClickArea
export type AreaString = "toggle" | ClickArea
type ClickFunc = (v: AreaString) => void

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
    autoClose?: AutoClose
    escClose?: boolean
    trigger?: Trigger | Trigger[]
    onAutoClose?: ClickFunc
}

export interface PopupProps extends CommonProps {
    children: React.ReactElement
    overlay?: React.ReactNode
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
    onClick?: ClickFunc
    onEscKeyDown?: () => void
}

export interface InnerState {
    left: number
    top: number
}
