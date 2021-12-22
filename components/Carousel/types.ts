import {
    ButtonAttrs,
    DivAttrs,
    StatusProps
} from "../Commons/consts-and-types";

export interface CarouselProps extends DivAttrs {
    keyboard?: boolean
    pause?: boolean | "hover"
    ride?: boolean | "carousel"
    wrap?: boolean
    touch?: boolean
    interval?: number
    controls?: boolean
    indicators?: boolean
    fade?: boolean
    variant?: "dark"
    onSlide?: () => void
    onSlid?: () => void
}

export type Direction = "prev" | "next"

export interface CarouselState {
    activeIndex: number
    nextIndex?: number | null
    dir?: Direction
}

export interface CarouselItemProps extends DivAttrs {
    caption?: React.ReactNode
    captionClass?: string
    interval?: number
    // internal only
    __index__?: number
}

type BaseProps = Omit<ButtonAttrs, "onClick"> &
    Omit<StatusProps, "disabled">

export interface IndicatorProps extends BaseProps {
    index: number
    onClick?: (i: number) => void
}