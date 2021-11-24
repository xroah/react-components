import * as React from "react"
import classNames from "reap-utils/lib/class-names"
import PropTypes from "prop-types"
import {ValueOf, Variant} from "../Commons/consts-and-types"
import {variantPropType} from "../Commons/prop-types"
import {createComponent} from "../Commons/utils"

const colors = ["light", "dark"] as const

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: Variant
    pill?: boolean
    textColor?: ValueOf<typeof colors>
}

export default createComponent<BadgeProps>({
    className: "badge",
    tag: "span",
    propTypes: {
        variant: variantPropType,
        pill: PropTypes.bool,
        color: PropTypes.oneOf(colors)
    },
    propsHandler({
        variant,
        pill,
        textColor,
        ...restProps
    }) {
        return {
            className: classNames(
                variant && `bg-${variant}`,
                pill && "rounded-pill",
                textColor && `text-${textColor}`
            ),
            newProps: restProps
        }
    }
})