import {InputHTMLAttributes} from "react"

export type ValueOf<T extends readonly any[]> = T[number]

export const variants = <const>[
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "light",
    "dark"
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
}