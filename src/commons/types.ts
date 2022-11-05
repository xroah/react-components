import { HTMLAttributes, ButtonHTMLAttributes  } from "react"
import { sizes, variants } from "./constants"

export type OneOf<T extends ReadonlyArray<unknown>> = T[number]

export type DivProps = HTMLAttributes<HTMLDivElement>

export interface ToggleEvents {
    onShow?: VoidFunction
    onShown?: VoidFunction
    onHide?: VoidFunction
    onHidden?: VoidFunction
}

export interface ButtonProps extends
ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: OneOf<typeof variants>
    size?: OneOf<typeof sizes>
    disabled?: boolean
}