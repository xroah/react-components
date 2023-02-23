import { ReactNode } from "react"
import { breakpoints, modalSizes } from "../commons/constants"
import {
    LayerProps,
    OneOf,
    ToggleEvents,
    ClosableProps,
    DivPropsWithNodeTitle,
    ButtonProps
} from "../commons/types"

export type HeaderProps = ClosableProps & DivPropsWithNodeTitle

export interface FooterProps {
    okText?: string
    cancelText?: string
    onOk?: VoidFunction
    onCancel?: VoidFunction
    footerBtnSize?: ButtonProps["size"]
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
}