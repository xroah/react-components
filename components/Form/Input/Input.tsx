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

const inputVariants = [
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
    variant?: ValueOf<typeof inputVariants>
    plain?: boolean
}

export default function Input(
    {
        className,
        size,
        htmlSize,
        variant,
        plain,
        ...restProps
    }: InputProps
) {
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
            size: htmlSize,
            className: classes,
            ...restProps
        }
    )
}

Input.propTypes = {
    size: sizePropType,
    htmlSize: number,
    variant: oneOf(inputVariants),
    plain: bool
}
Input.defaultProps = {
    variant: "input"
}