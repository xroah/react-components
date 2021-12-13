import {
    HTMLAttributes,
    MouseEvent,
    ReactNode
} from "react"
import {
    Cb,
    ClosableProps,
    Events,
    Size,
    ValueOf,
    VisibleProps
} from "../Commons/common-types"
import {InputProps} from "../Commons/Input"

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
    size?: ValueOf<typeof sizes>
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
    unmountOnExit?: boolean
    mountBackdropToBody?: boolean
    onBackdropHidden?: Cb
}

export interface ModalState {
    display: "block" | "none"
    backdropVisible?: boolean
}


type Base = Omit<ModalCommonProps, "onOk" | "onCancel">

export type DialogType = "alert" | "confirm" | "prompt"
export interface OkFunc {
    (value?: string, input?: HTMLElement | null): void | false
}

export interface DialogOptions extends Base {
    input?: InputProps
    buttonSize?: Size
    onOk?: OkFunc
    onCancel?: Cb
    // only for prompt
    errorMessage?: ReactNode
    validation?: boolean
}

export interface DialogProps extends DialogOptions {
    type: DialogType
}


export interface ModalDialogProps extends ModalProps {
    prefix: string
    footer?: React.ReactNode
}
