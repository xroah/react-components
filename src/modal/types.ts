import { ReactNode } from "react"
import {
    breakpoints,
    modalCloseTypes,
    modalSizes
} from "../commons/constants"
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
    fullscreen?: boolean | OneOf<typeof breakpoints>
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
    onClose?: (type?: CloseType) => unknown
}