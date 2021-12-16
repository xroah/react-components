import * as React from "react"
import classNames from "reap-utils/lib/class-names"
import PropTypes from "prop-types"
import {DivAttrs, SizeProp} from "../Commons/consts-and-types"
import {getPrefixFunc} from "../Commons/utils"
import {sizePropType} from "../Commons/prop-types"
import {createSizeElement} from "../Commons/SizeConsumer"

interface GroupProps extends SizeProp, DivAttrs {
    vertical?: boolean
}

const prefix = "btn-group"

export default function ButtonGroup(
    {
        vertical,
        ...restProps
    }: GroupProps
) {
    return createSizeElement(
        restProps,
        {
            prefixAsClass: false,
            getClass() {
                return vertical ? `${prefix}-vertical` : prefix
            }
        }
    )
}

ButtonGroup.propTypes = {
    vertical: PropTypes.bool,
    size: sizePropType
}
