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

export const modalCloseTypes = [
    "keyboard",
    "close",
    "backdrop"
] as const