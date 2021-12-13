import {
    HTMLAttributes,
    MouseEvent,
    ReactNode
} from "react"
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

export type ClickCb = (evt: MouseEvent) => void

export interface ModalCommonProps extends Events, ClosableProps {
    backdrop?: boolean | "static"
    keyboard?: boolean
    verticalCenter?: boolean
    title?: ReactNode
    okText?: ReactNode
    cancelText?: ReactNode
    className?: string
    fade?: boolean
    onOk?: ClickCb
    onCancel?: ClickCb
}

type BaseProps = Omit<HTMLAttributes<HTMLDivElement>, "title"> &
    VisibleProps & ModalCommonProps

export interface ModalProps extends BaseProps {
    focus?: boolean
    scrollable?: boolean
    fullscreen?: boolean | ValueOf<typeof breakpoints>
    footer?: ReactNode
    size?: ValueOf<typeof sizes>
    showCancel?: boolean
    showOk?: boolean
    unmountOnExit?: boolean
    mountBackdropToBody?: boolean
    onBackdropHidden?: Cb
}

export interface ModalState {
    display: "block" | "none"
    backdropVisible?: boolean
}