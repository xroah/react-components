import { HTMLAttributes } from "react"
import { sizes, variants } from "./constants"

export type OneOf<T extends ReadonlyArray<unknown>> = T[number]

export interface ToggleEvents {
    onShow?: VoidFunction
    onShown?: VoidFunction
    onHide?: VoidFunction
    onHidden?: VoidFunction
}

export interface ButtonProps extends
    HTMLAttributes<HTMLButtonElement> {
    variant?: OneOf<typeof variants>
    size?: OneOf<typeof sizes>
    disabled?: boolean
}