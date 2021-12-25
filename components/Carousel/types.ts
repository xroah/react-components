import {ReactNode} from "react";
import {
    ButtonAttrs,
    DivAttrs,
    StatusProps
} from "../Commons/consts-and-types";

export interface SlideProps {
    slide?: boolean
}

export interface IntervalProps {
    interval?: number
}

export interface CarouselProps extends DivAttrs, SlideProps, IntervalProps {
    keyboard?: boolean
    pause?: false | "hover"
    ride?: boolean | "carousel"
    wrap?: boolean
    touch?: boolean
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
    next?: ReactNode
}

export interface CarouselItemProps extends DivAttrs, IntervalProps {
    caption?: React.ReactNode
    captionClass?: string
    // internal only
    __index__?: number
    __onEnter__?: () => void
    __onEntered__?: () => void
}

type BaseProps = Omit<ButtonAttrs, "onClick"> & Omit<StatusProps, "disabled">

export interface IndicatorProps extends BaseProps {
    index: number
    onClick?: (i: number) => void
}

export type ContextObject = CarouselState & SlideProps

export interface ControlBtnProps extends ButtonAttrs {
    prefix: string
}