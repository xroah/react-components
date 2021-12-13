import * as React from "react"
import {classNames} from "reap-utils/lib"
import {Size} from "./common-types"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary"
    size?: Size
}

const Button = React.forwardRef(
    (
        {
            className,
            variant = "primary",
            size,
            ...restProps
        }: ButtonProps,
        ref: React.ForwardedRef<HTMLButtonElement>
    ) => {
        const PREFIX = "btn"
        const classes = classNames(
            className,
            PREFIX,
            `${PREFIX}-${variant}`,
            size && `${PREFIX}-${size}`
        )

        return (
            <button
                type="button"
                ref={ref}
                className={classes}
                {...restProps} />
        )
    }
)

export default Button