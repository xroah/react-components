import {
    TextareaHTMLAttributes,
    HTMLAttributes,
    forwardRef
} from "react"
import {
    InputAttrs,
    SizeProp,
    ValueOf
} from "../../Commons/consts-and-types"
import {
    bool,
    number,
    oneOf
} from "prop-types"
import {sizePropType} from "../../Commons/prop-types"
import {createSizeElement} from "../../Commons/SizeConsumer"

const variants = [
    "input",
    "textarea"
] as const

type InputBase = Omit<InputAttrs, "size">
type TextareaBase = Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    keyof HTMLAttributes<HTMLTextAreaElement>
>

export type InputCommonProps = SizeProp & InputBase & TextareaBase

export interface InputProps extends InputCommonProps {
    htmlSize?: number
    variant?: ValueOf<typeof variants>
    plain?: boolean
}

const Input = forwardRef(
    (
        {
            plain,
            variant,
            htmlSize,
            ...restProps
        }: InputProps,
        ref: React.ForwardedRef<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const prefix = "form-control"

        return createSizeElement(
            {
                ref,
                ...restProps
            },
            {
                tag: variant,
                prefix,
                getClass() {
                    return plain ? `${prefix}-plaintext` : ""
                }
            }
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