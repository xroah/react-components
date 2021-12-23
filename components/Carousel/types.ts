import {
    ButtonAttrs,
    DivAttrs,
    StatusProps
} from "../Commons/consts-and-types";

export interface SlideProps {
    slide?: boolean
}

export interface CarouselProps extends DivAttrs, SlideProps {
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
    onSlide?: (i: number) => void
    onSlid?: (i: number) => void
}

export type Direction = "prev" | "next"

export interface CarouselState {
    activeIndex: number
    dir?: Direction
}

export interface CarouselItemProps extends DivAttrs {
    caption?: React.ReactNode
    captionClass?: string
    interval?: number
    // internal only
    __index__?: number
    __onEnter__?: () => void
    __onEntered__?: () => void
}

type BaseProps = Omit<ButtonAttrs, "onClick"> &
    Omit<StatusProps, "disabled">

export interface IndicatorProps extends BaseProps {
    index: number
    onClick?: (i: number) => void
}

export type ContextObject = CarouselState & SlideProps