import React, { FunctionComponent } from "react"
import classNames from "classnames"
import { ButtonProps } from "./types"

const Button: FunctionComponent<ButtonProps> = (
    {
        disabled,
        className,
        size,
        variant = "primary",
        ...restProps
    }
) => {
    const classes = classNames(
        "btn",
        `btn-${variant}`,
        size && `btn-${size}`
    )

    return (
        <button
            className={classes}
            disabled={disabled}
            {...restProps} />
    )
}

export default Button