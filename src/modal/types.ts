import { HTMLAttributes, ReactNode } from "react"
import { modalCloseTypes, modalSizes } from "../commons/constants"
import {
    DivProps,
    OneOf,
    ToggleEvents
} from "../commons/types"

export type CloseType = OneOf<typeof modalCloseTypes>

export interface DialogProps extends DivProps {
    contentScrollable?: boolean
    closable?: boolean
    title?: string
    size?: OneOf<typeof modalSizes>
    center?: boolean
    header?: ReactNode
    footer?: ReactNode
    keyboard?: boolean
    okText?: string
    cancelText?: string
    onOk?: VoidFunction
    onCancel?: VoidFunction
    onClose?: (type?: CloseType) => unknown
}

export interface ModalProps extends ToggleEvents, DialogProps {
    visible?: boolean
    transition?: boolean
    backdrop?: boolean | "static"
}