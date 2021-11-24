import * as React from "react"
import {SizeProp, ValueOf} from "../../Commons/consts-and-types"
import classNames from "reap-utils/lib/class-names"
import {getPrefixFunc} from "../../Commons/utils"
import {
    bool,
    number,
    oneOf
} from "prop-types"
import {sizePropType} from "../../Commons/prop-types"
import {SizeContext} from "../../Commons/contexts"
import SizeConsumer from "../../Commons/SizeConsumer"

const variants = [
    "input",
    "textarea"
] as const

type InputBase = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">
type TextareaBase = Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    keyof React.HTMLAttributes<HTMLTextAreaElement>
>

export type InputCommonProps = SizeProp & InputBase & TextareaBase

export interface InputProps extends InputCommonProps {
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
        ref: React.ForwardedRef<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        return (
            <SizeConsumer size={size}>
                {
                    size => {
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
                    }
                }
            </SizeConsumer>
        )
    }
)

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