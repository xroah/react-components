import { HTMLAttributes, ReactNode } from "react"
import { modalSizes } from "../commons/constants"
import { OneOf, ToggleEvents } from "../commons/types"

export interface ModalProps extends
    ToggleEvents, HTMLAttributes<HTMLElement> {
    visible?: boolean
    transition?: boolean
    backdrop?: boolean | "static"
    contentScrollable?: boolean
    closable?: boolean
    title?: string
    size?: OneOf<typeof modalSizes>
    center?: boolean
    header?: ReactNode
    footer?: ReactNode
    onOk?: VoidFunction
    onCancel?: VoidFunction
    onClose?: VoidFunction
}