export const sizes = ["sm", "lg"] as const

export const modalSizes = [...sizes, "xl"] as const

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

export const closeTypes = [
    "keyboard",
    "close",
    "backdrop"
] as const

export const breakpoints = [
    "sm",
    "md",
    "lg",
    "xl",
    "xxl"
] as const

export const OffCanvasPlacements = [
    "start",
    "top",
    "bottom",
    "end"
] as const