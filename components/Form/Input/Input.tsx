import * as React from "react"
import {Size, ValueOf} from "@commons/consts-and-types"
import classNames from "reap-utils/lib/class-names"
import {getPrefixFunc} from "@commons/utils"
import {
    bool,
    number,
    oneOf
} from "prop-types"
import {sizePropType} from "@commons/prop-types"

const variants = [
    "input",
    "textarea"
] as const

type InputBase = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">
type TextareaBase = Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    keyof React.HTMLAttributes<HTMLTextAreaElement>
>

export interface SizeProp extends InputBase, TextareaBase {
    size?: Size
}

interface InputProps extends SizeProp {
    htmlSize?: number
    variant?: ValueOf<typeof variants>
    plain?: boolean
}

const Input = React.forwardRef(
    (
        {
            className,
            size,
            plain,
            variant,
            htmlSize,
            ...restProps
        }: InputProps,
        ref: React.ForwardedRef<HTMLInputElement>
    ) => {
        const prefix = getPrefixFunc("form-control")
        const classes = classNames(
            className,
            prefix(),
            size && prefix(size),
            plain && prefix("plaintext")
        )

        return React.createElement(
            variant!,
            {
                ref,
                size: htmlSize,
                className: classes,
                ...restProps
            }
        )
    })

Input.propTypes = {
    size: sizePropType,
    htmlSize: number,
    variant: oneOf(variants),
    plain: bool
}
Input.defaultProps = {
    variant: "input"
}
Input.displayName = "Input"

export default Input