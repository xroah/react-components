import {HTMLAttributes} from "react"
import classNames from "reap-utils/lib/class-names"
import PropTypes from "prop-types"
import {
    lightDark,
    ValueOf,
    Variant
} from "../Commons/consts-and-types"
import {variantPropType} from "../Commons/prop-types"
import {createComponent} from "reap-utils/lib/react"
import {capitalize} from "reap-utils/lib"

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: Variant
    pill?: boolean
    textColor?: ValueOf<typeof lightDark>
}

const CLASS_NAME = "badge"

export default createComponent<BadgeProps>({
    className: CLASS_NAME,
    tag: "span",
    displayName: capitalize(CLASS_NAME),
    propTypes: {
        variant: variantPropType,
        pill: PropTypes.bool,
        color: PropTypes.oneOf(lightDark)
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