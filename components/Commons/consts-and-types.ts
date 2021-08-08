type ValueOf<T extends readonly any[]> = T[number]
export const variants = [
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "light",
    "dark"
] as const
export type Variant = ValueOf<typeof variants>