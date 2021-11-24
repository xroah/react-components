import * as React from "react"
import classNames from "reap-utils/lib/class-names"
import {InputCommonProps} from "./Input"
import {getPrefixFunc} from "../../Commons/utils"
import {sizePropType} from "../../Commons/prop-types"
import SizeConsumer from "../../Commons/SizeConsumer"

export default function InputGroup(
    {
        size,
        className,
        hasValidation,
        ...restProps
    }: InputCommonProps & {hasValidation?: boolean}
) {
    return (
        <SizeConsumer size={size}>
            {
                size => {
                    const prefix = getPrefixFunc("input-group")
                    const classes = classNames(
                        className,
                        prefix(),
                        size && prefix(size),
                        hasValidation && "has-validation"
                    )

                    return <div className={classes} {...restProps} />
                }
            }
        </SizeConsumer>
    )
}

InputGroup.propTypes = {
    size: sizePropType
}