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

export const textColors = [
    ...variants,
    "white",
    "black",
    "muted",
    "white-50",
    "black-50"
] as const
export type TextColor = ValueOf<typeof textColors>