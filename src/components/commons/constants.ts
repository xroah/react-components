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
    ...modalSizes,
    "md",
    "xxl"
] as const

export const offCanvasPlacements = [
    "start",
    "top",
    "bottom",
    "end"
] as const

export const spinnerAnimations = [
    "border",
    "grow"
] as const