import * as React from "react"
import classNames from "reap-utils/lib/class-names"
import PropTypes from "prop-types"
import {Size} from "../Commons/consts-and-types"
import {getPrefixFunc} from "../Commons/utils"
import {sizePropType} from "../Commons/prop-types"

interface GroupProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: Size
    vertical?: boolean
}

export default function ButtonGroup(
    {
        size,
        vertical,
        className,
        ...restProps
    }: GroupProps
) {
    const prefix = getPrefixFunc("btn-group")
    const classes = classNames(
        className,
        size && prefix(size),
        vertical ? prefix("vertical") : prefix()
    )

    return <div className={classes} {...restProps} />
}

ButtonGroup.propTypes = {
    vertical: PropTypes.bool,
    size: sizePropType
}
