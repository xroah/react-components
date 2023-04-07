import { CSSProperties, ReactNode } from "react"
import { ButtonProps } from "../basics/button"
import { InputProps } from "../basics/input"
import { breakpoints, modalSizes } from "../commons/constants"
import {
    LayerProps,
    OneOf,
    ClosableProps,
    DivPropsWithNodeTitle,
    Variant,
    HookApi
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

export interface ModalProps extends LayerProps, FooterProps {
    contentScrollable?: boolean
    size?: OneOf<typeof modalSizes>
    center?: boolean
    header?: ReactNode
    footer?: ReactNode
    fullscreen?: boolean | OneOf<typeof breakpoints>
    transition?: boolean
    backdrop?: boolean | "static"
    timeout?: number
    dialogStyle?: CSSProperties
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

export interface UpdateFunc {
    (opts: OpenOptions): void
}

export type HookOpenFunc = UpdateFunc

export interface OpenFunc {
    (opts: OpenOptions): { update: UpdateFunc, close: VoidFunction }
}

export interface Shortcut {
    (
        msg: ReactNode,
        title?: ReactNode,
        opts?: ShortcutOptions
    ): Promise<unknown>
}

export interface ModalHookApi extends HookApi<OpenOptions> {
    open: HookOpenFunc
    close: VoidFunction
    alert: Shortcut
    confirm: Shortcut
    prompt: Shortcut
}