import React from "react"
import classNames from "classnames"
import { ButtonProps } from "./types"

export default function Button(
    {
        disabled,
        className,
        size,
        variant = "primary",
        ...restProps
    }: ButtonProps
) {
    return (
        <button
            className={classNames(
                "btn",
                `btn-${variant}`,
                size && `btn-${size}`
            )}
            disabled={disabled}
            {...restProps} />
    )
}