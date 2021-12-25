import {
    AnchorHTMLAttributes,
    ButtonHTMLAttributes,
    HTMLAttributes,
    InputHTMLAttributes,
    ReactElement
} from "react"

export type ValueOf<T extends readonly any[]> = T[number]

export const lightDark = ["light", "dark"] as const
export const variants = <const>[
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    ...lightDark
]
export type Variant = ValueOf<typeof variants>

export const sizes = <const>["sm", "lg"]
export type Size = ValueOf<typeof sizes>

export const alignments = <const>["start", "center", "end"]
export type Alignment = ValueOf<typeof alignments>
export const breakpoints = [
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "xxl"
] as const
export type Breakpoint = ValueOf<typeof breakpoints>
export type BreakpointType<K extends Breakpoint, V> = {
    [k in K]?: V
}

export type PrefixFunc = (s?: string | number) => string

export const textColors = <const>[
    ...variants,
    "white",
    "black",
    "muted",
    "white-50",
    "black-50"
]
export type TextColor = ValueOf<typeof textColors>

export const bgColors = <const>[
    ...variants,
    "body",
    "white",
    "transparent"
]
export type BgColor = ValueOf<typeof bgColors>

export const orders = ["first", "last"] as const
export type Order = ValueOf<typeof orders> | number
export type OrderBreakpoints = BreakpointType<Breakpoint, Order>

export type Booleanish = boolean | "true" | "false"

export type CSSComponentProps = {
    className?: string
    // for error hint of typescript
    // if children extend from super may not cause an error
    children: ReactElement
}

export interface WithVariantProp<T> extends HTMLAttributes<T> {
    variant?: Variant
}

export type ColSpan = "auto" | number | boolean
export type ColSpanBreakpoints = BreakpointType<Breakpoint, ColSpan>

export type SizeProp = {
    size?: Size
}

export type DivAttrs = HTMLAttributes<HTMLDivElement>
export type AnchorAttrs = AnchorHTMLAttributes<HTMLAnchorElement>
export type ButtonAttrs = ButtonHTMLAttributes<HTMLButtonElement>
export type InputAttrs = InputHTMLAttributes<HTMLInputElement>

export interface StatusProps {
    active?: boolean
    disabled?: boolean
}

export const ACTIVE_CLASS = "active"
export const DISABLED_CLASS = "disabled"

export interface ChildrenProps {
    children: ReactElement
}