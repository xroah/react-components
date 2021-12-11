import {HTMLAttributes, ReactNode} from "react"
import {
    Cb,
    ClosableProps,
    Events,
    ValueOf,
    VisibleProps
} from "../Commons/common-types"

export const breakpoints = [
    "sm",
    "md",
    "lg",
    "xl",
    "xxl"
] as const
export const sizes = [
    "sm",
    "lg",
    "xl"
] as const

type BaseProps = HTMLAttributes<HTMLDivElement> &
    Events & VisibleProps & ClosableProps

export interface ModalProps extends Omit<BaseProps, "title"> {
    backdrop?: boolean | "static"
    keyboard?: boolean
    focus?: boolean
    scrollable?: boolean
    verticalCenter?: boolean
    fullscreen?: boolean | ValueOf<typeof breakpoints>
    title?: ReactNode
    okText?: ReactNode
    cancelText?: ReactNode
    footer?: ReactNode
    size?: ValueOf<typeof sizes>
    fade?: boolean
    onOk?: Cb
    onCancel?: Cb
}

export interface ModalState {
    display: "block" | "none"
    backdropVisible?: boolean
}

export interface ModalBackdropProps {
    visible?: boolean
}