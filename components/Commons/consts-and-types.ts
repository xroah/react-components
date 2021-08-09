export type ValueOf<T extends readonly string[]> = T[number]

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