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
export type AreaString = "esc" | "toggle" | ClickArea
export type Placement = ValueOf<typeof placements>
type ClickFunc = (v: AreaString) => void
type Cb = () => void

interface PlacementProps {
    placement?: Placement
}

export interface CommonProps extends PlacementProps{
    alignment?: ValueOf<typeof aliments>
    fallbackPlacements?: Placement[]
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
    flip?: boolean
    onShow?: Cb
    onShown?: Cb
    onHide?: Cb
    onHidden?: Cb
    onAlign?: (v: OnAlignParam) => void
}

export interface InnerProps extends CommonProps {
    getTarget: () => Element | null
    onMouseEnter?: (evt: React.MouseEvent) => void
    onMouseLeave?: (evt: React.MouseEvent) => void
    onClose?: ClickFunc
}

export interface InnerState {
    left: number
    top: number
}

export interface AlignRet extends OnAlignParam, PlacementProps {
    boundary?: HTMLElement
    needFlip?: boolean
}

interface OnAlignParam extends InnerState, PlacementProps {
    newPlacement?: Placement
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
    getContainer: () => HTMLElement | null
}