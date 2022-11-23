import { ReactNode } from "react"
import { breakpoints, modalSizes } from "../commons/constants"
import {
    CloseType,
    LayerProps,
    OneOf,
    ToggleEvents
} from "../commons/types"


export interface DialogProps extends LayerProps {
    contentScrollable?: boolean
    size?: OneOf<typeof modalSizes>
    center?: boolean
    header?: ReactNode
    footer?: ReactNode
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