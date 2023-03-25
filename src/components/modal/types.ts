import { InputProps } from "r-layers/basics/input"
import { ReactNode } from "react"
import { breakpoints, modalSizes } from "../commons/constants"
import {
    LayerProps,
    OneOf,
    ToggleEvents,
    ClosableProps,
    DivPropsWithNodeTitle,
    ButtonProps,
    Variant
} from "../commons/types"

export type HeaderProps = ClosableProps & DivPropsWithNodeTitle

export interface FooterProps {
    ok?: boolean
    okText?: string
    okLoading?: boolean
    okVariant?: Variant
    cancel?: boolean
    cancelText?: string
    cancelVariant?: Variant
    footerBtnSize?: ButtonProps["size"]
    onOk?: VoidFunction
    onCancel?: VoidFunction
}

export interface DialogProps extends LayerProps, FooterProps {
    contentScrollable?: boolean
    size?: OneOf<typeof modalSizes>
    center?: boolean
    header?: ReactNode
    footer?: ReactNode
    fullscreen?: boolean | OneOf<typeof breakpoints>
}

export interface ModalProps extends ToggleEvents, DialogProps {
    transition?: boolean
    backdrop?: boolean | "static"
    timeout?: number
}

export interface OpenOptions extends Omit<ModalProps, "children"> {
    content?: ReactNode
}

export type Callbacks = Pick<
    ModalProps,
    "onHidden" | "onClose" | "onOk" | "onCancel"
>

export type ShortcutOptions = Pick<
    ModalProps,
    "backdrop" |
    "keyboard" |
    "closable" |
    "okText" |
    "cancelText" |
    "okVariant" |
    "cancelVariant"
> & {
    inputOptions?: InputProps
}

export type ShortcutType = "alert" | "confirm" | "prompt"