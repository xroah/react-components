import React, {
    ForwardedRef,
    InputHTMLAttributes,
    forwardRef
} from "react"
import { classnames } from "../utils"
import { sizes } from "../commons/constants"
import { OneOf } from "../commons/types"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    sizing?: OneOf<typeof sizes>
    plaintext?: boolean
}

const Input = forwardRef(
    (
        {
            sizing,
            plaintext,
            readOnly,
            ...restProps
        }: InputProps,
        ref: ForwardedRef<HTMLInputElement>
    ) => {
        const PREFIX = "form-control"
        const classes = classnames(
            plaintext ? `${PREFIX}-plaintext` : PREFIX,
            sizing && `${PREFIX}-${sizing}`,
        )

        return (
            <input
                className={classes}
                ref={ref}
                readOnly={readOnly}
                {...restProps} />
        )
    }
)

Input.displayName = "Input"

export default Input