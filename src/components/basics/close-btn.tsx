import React, { ButtonHTMLAttributes } from "react"
import { classnames } from "../utils"

export default function CloseBtn(
    {
        type = "button",
        className,
        ...restProps
    }: ButtonHTMLAttributes<HTMLButtonElement>
) {
    return (
        <button
            type={type}
            className={classnames(className, "btn-close")}
            {...restProps} />
    )
}