import {HTMLAttributes} from "react"
import classNames from "reap-utils/lib/class-names"
import PropTypes from "prop-types"
import {ValueOf, Variant} from "../Commons/consts-and-types"
import {variantPropType} from "../Commons/prop-types"
import {createComponent} from "reap-utils/lib/react"

const colors = ["light", "dark"] as const

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: Variant
    pill?: boolean
    textColor?: ValueOf<typeof colors>
}

export default createComponent<BadgeProps>({
    className: "badge",
    tag: "span",
    displayName: "Badge",
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