import * as React from "react"
import classNames from "reap-utils/lib/class-names"
import PropTypes from "prop-types"
import {SizeProp} from "../Commons/consts-and-types"
import {getPrefixFunc} from "../Commons/utils"
import {sizePropType} from "../Commons/prop-types"
import SizeConsumer from "../Commons/SizeConsumer"

interface GroupProps extends SizeProp,
    React.HTMLAttributes<HTMLDivElement> {
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
    return (
        <SizeConsumer size={size}>
            {
                size => {
                    const prefix = getPrefixFunc("btn-group")
                    const classes = classNames(
                        className,
                        size && prefix(size),
                        vertical ? prefix("vertical") : prefix()
                    )

                    return <div className={classes} {...restProps} />
                }
            }
        </SizeConsumer>
    )
}

ButtonGroup.propTypes = {
    vertical: PropTypes.bool,
    size: sizePropType
}
