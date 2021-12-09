import {HTMLAttributes, ReactNode} from "react"
import {Cb, Events, ValueOf} from "../Commons/common-types"

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

type BaseProps = HTMLAttributes<HTMLDivElement> & Events

export interface ModalProps extends Omit<BaseProps, "title"> {
   backdrop?: boolean | "static"
   keyboard?: boolean
   focus?: boolean 
   scrollable?: boolean
   verticalCenter?: boolean
   fullscreen?: boolean | ValueOf<typeof breakpoints>
   title?: ReactNode
   okText?: ReactNode
   cancelText?: ReactNode
   showClose?: boolean
   footer?: ReactNode
   size?: ValueOf<typeof sizes>
   visible?: boolean
   onOk?: Cb
   onCancel?: Cb
   onClose?: Cb
}

export interface ModalState {
    display: "block" | "none"
}