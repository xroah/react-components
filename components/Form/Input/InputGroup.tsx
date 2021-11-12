import * as React from "react"
import classNames from "reap-utils/lib/class-names"
import {SizeProp} from "./Input"
import {getPrefixFunc} from "@commons/utils"
import {sizePropType} from "@commons/prop-types"

export default function InputGroup(
    {
        size,
        className,
        ...restProps
    }: SizeProp
) {
    const prefix = getPrefixFunc("input-group")
    const classes = classNames(
        className,
        prefix(),
        size && prefix(size)
    )

    return <div className={classes} {...restProps} />
}

InputGroup.propTypes = {
    size: sizePropType
}