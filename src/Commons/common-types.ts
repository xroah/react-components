import {ButtonHTMLAttributes, HTMLAttributes} from "react"

export type ValueOf<T extends readonly any[]> = T[number]

export type Cb = (node?: HTMLElement | null) => void
export type CloseFuncParam = "close" | "esc" | "backdrop" | "auto"
export type CloseFunc = (type?: CloseFuncParam) => void

export type Events = {
    onShow?: Cb
    onShown?: Cb
    onHide?: Cb
    onHidden?: Cb
}

export interface VisibleProps {
    visible?: boolean
}

export interface AnimProps {
    animation?: boolean
}

export interface ClosableProps {
    closable?: boolean
    onClose?: CloseFunc
}

export interface AutoHideProps {
    autoHide?: boolean
    delay?: number
}

export interface CommonTransitionProps {
    unmountOnExit?: boolean
    hideOnExit?: boolean
}

export type DivProps = HTMLAttributes<HTMLDivElement>

export type Size = "sm" | "lg"

export type ButtonBaseProps = ButtonHTMLAttributes<HTMLButtonElement>