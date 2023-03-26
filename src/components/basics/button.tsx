import React, {
    ButtonHTMLAttributes,
    ForwardedRef,
    forwardRef
} from "react"
import { OneOf, Variant } from "../commons/types"
import { classnames } from "../utils"
import { sizes } from "../commons/constants"

export interface ButtonProps extends
    ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant
    size?: OneOf<typeof sizes>
    disabled?: boolean
}

const Button = forwardRef(
    (
        {
            className,
            size,
            variant = "primary",
            type = "button",
            ...restProps
        }: ButtonProps,
        ref: ForwardedRef<HTMLButtonElement>
    ) => {
        const classes = classnames(
            className,
            "btn",
            `btn-${variant}`,
            size && `btn-${size}`
        )

        return (
            <button
                type={type}
                ref={ref}
                className={classes}
                {...restProps} />
        )
    }
)
Button.displayName = "Button"

export default Button