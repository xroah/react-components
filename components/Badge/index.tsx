import * as React from "react"
import {
    classNames,
    variantType,
    variantArray,
    isUndef
} from "../utils"
import PropTypes from "prop-types"
import {AnchorCommonProps} from "../Common/CommonPropsInterface"

export interface BadgeProps extends AnchorCommonProps<HTMLSpanElement & HTMLAnchorElement> {
    variant?: variantType
    pill?: boolean
}

export default function Badge(props: BadgeProps) {
    const {
        className,
        variant,
        pill,
        href,
        ...otherProps
    } = props
    const PREFIX = "badge"
    let tag = "span"

    if (!isUndef(href)) {
        tag = "a"
    }

    return React.createElement(
        tag,
        {
            href,
            className: classNames(
                className,
                PREFIX,
                variant && `${PREFIX}-${variant}`,
                pill && `${PREFIX}-pill`
            ),
            ...otherProps
        }
    )
}

Badge.propTypes = {
    variant: PropTypes.oneOf(variantArray),
    pill: PropTypes.bool,
    href: PropTypes.string
}
Badge.defaultProps = {
    pill: false
}