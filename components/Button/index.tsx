import * as React from "react"
import PropTypes from "prop-types"
import classNames from "reap-utils/lib/class-names"
import omit from "reap-utils/lib/omit"
import {ButtonCommonProps} from "../Commons/CommonPropsInterface"
import {Variant, Variants} from "../Commons/Variants"

export interface ButtonProps extends ButtonCommonProps<HTMLButtonElement | HTMLAnchorElement> {
    variant?: Variant | "link"
    outline?: boolean
    size?: string
    disabled?: boolean
    active?: boolean
    href?: string
    block?: boolean
    target?: string
    textNoWrap?: boolean
}

const Button = React.forwardRef(
    (
        {
            children,
            className,
            block,
            disabled,
            active,
            variant,
            size,
            outline,
            textNoWrap,
            ...restProps
        }: ButtonProps,
        ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>
    ) => {
        const PREFIX = "btn"
        const classes = classNames(
            className,
            PREFIX,
            disabled && "disabled",
            active && "active",
            size && `${PREFIX}-${size}`,
            block && `${PREFIX}-block`,
            outline ? `${PREFIX}-outline-${variant}` : `${PREFIX}-${variant}`,
            textNoWrap && "text-nowrap"
        )
        let tag = "button"

        if (restProps.href) {
            tag = "a"
            restProps.tabIndex = -1
            restProps.role = "button"

            omit(restProps, ["type"])
        } else {
            omit(restProps, ["target", "href"])
        }

        return React.createElement(
            tag,
            {
                className: classes,
                ref,
                ...restProps
            },
            children
        )
    }
)

export const groupType = PropTypes.oneOf(["checkbox", "radio"])

export const commonPropTypes = {
    variant: PropTypes.oneOf([...Variants, "link"]) as any,
    outline: PropTypes.bool,
    size: PropTypes.string,
    disabled: PropTypes.bool
}

Button.propTypes = {
    ...commonPropTypes,
    href: PropTypes.string,
    type: PropTypes.oneOf(["button", "submit", "reset"]),
    active: PropTypes.bool,
    block: PropTypes.bool
}
Button.defaultProps = {
    variant: "primary",
    type: "button",
    textNoWrap: false
}
Button.displayName = "Button"

export default Button