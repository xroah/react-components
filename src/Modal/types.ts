import {
    MouseEvent as ReactMouseEvent,
    ReactNode
} from "react"
import {
    AnimProps,
    Cb,
    ClosableProps,
    DivProps,
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

export type ClickCb = (evt: ReactMouseEvent) => void

export interface ModalCommonProps extends Events, ClosableProps, AnimProps {
    backdrop?: boolean | "static"
    keyboard?: boolean
    verticalCenter?: boolean
    title?: ReactNode
    okText?: ReactNode
    cancelText?: ReactNode
    className?: string
    size?: ValueOf<typeof sizes>
    onOk?: ClickCb
    onCancel?: ClickCb
}

type ModalBaseProps = ModalCommonProps & VisibleProps & DivProps

export interface ModalProps extends ModalBaseProps {
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

export type DialogType = "alert" | "confirm" | "prompt"
export interface OkFunc {
    (value?: string, input?: HTMLElement | null): void | false
}

export interface DialogOptions extends
    Omit<ModalCommonProps, "onOk" | "onCancel"> {
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
