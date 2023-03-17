import {
    HTMLAttributes,
    ButtonHTMLAttributes,
    ReactNode
} from "react"
import { closeTypes, sizes, variants } from "./constants"

export type OneOf<T extends ReadonlyArray<unknown>> = T[number]

export type DivProps = HTMLAttributes<HTMLDivElement>

export interface DivPropsWithNodeTitle extends Omit<DivProps, "title"> {
    title?: ReactNode
}

export type CloseType = OneOf<typeof closeTypes>

export interface ToggleEvents {
    onShow?: VoidFunction
    onShown?: VoidFunction
    onHide?: VoidFunction
    onHidden?: VoidFunction
}

export interface ClosableProps {
    closable?: boolean
    onClose?: VoidFunction
}
export interface LayerProps extends
    ToggleEvents, DivPropsWithNodeTitle, ClosableProps {
    visible?: boolean
    backdrop?: boolean | "static"
    keyboard?: boolean
    onClose?: (type?: CloseType) => unknown
}

export interface ButtonProps extends
    ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant
    size?: OneOf<typeof sizes>
    disabled?: boolean
}

export type Variant = OneOf<typeof variants>

export interface HookApi<O, K = string> {
    open: (options: O) => void
    close: (k: K) => void
}