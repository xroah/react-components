import * as React from "react"
import classNames from "reap-utils/lib/class-names"
import {SizeProp} from "./Input"
import {getPrefixFunc} from "../../Commons/utils"
import {sizePropType} from "../../Commons/prop-types"

export default function InputGroup(
    {
        size,
        className,
        hasValidation,
        ...restProps
    }: SizeProp & {hasValidation?: boolean}
) {
    const prefix = getPrefixFunc("input-group")
    const classes = classNames(
        className,
        prefix(),
        size && prefix(size),
        hasValidation && "has-validation"
    )

    return <div className={classes} {...restProps} />
}

InputGroup.propTypes = {
    size: sizePropType
}