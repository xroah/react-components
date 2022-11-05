import { HTMLAttributes, ReactNode } from "react"
import { modalSizes } from "../commons/constants"
import {
    DivProps,
    OneOf,
    ToggleEvents
} from "../commons/types"

export interface DialogProps extends DivProps {
    contentScrollable?: boolean
    closable?: boolean
    title?: string
    size?: OneOf<typeof modalSizes>
    center?: boolean
    header?: ReactNode
    footer?: ReactNode
    okText?: string
    cancelText?: string
    onOk?: VoidFunction
    onCancel?: VoidFunction
    onClose?: VoidFunction
}

export interface ModalProps extends ToggleEvents, DialogProps {
    visible?: boolean
    transition?: boolean
    backdrop?: boolean | "static"
}