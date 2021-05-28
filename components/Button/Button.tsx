import * as React from "react"
import PropTypes from "prop-types"
import classNames from "reap-utils/lib/class-names"
import {Variant, Variants} from "../Commons/Variants"
import {AnchorCommonProps} from "../Commons/CommonPropsInterface"

type BaseProps = Omit<React.ButtonHTMLAttributes<HTMLElement>, "type">
export interface ButtonProps extends BaseProps, AnchorCommonProps {
    variant?: Variant | "link"
    outline?: boolean
    size?: "sm" | "lg"
    disabled?: boolean
    active?: boolean
    textNoWrap?: boolean
    tag?: string
    type?: "reset" | "button" | "submit" | "checkbox" | "radio"
}

const Button = React.forwardRef(
    (
        {
            children,
            className,
            disabled,
            active,
            variant,
            size,
            outline,
            textNoWrap,
            tag,
            ...restProps
        }: ButtonProps,
        ref: React.Ref<HTMLElement>
    ) => {
        const PREFIX = "btn"
        const classes = classNames(
            className,
            PREFIX,
            disabled && "disabled",
            active && "active",
            size && `${PREFIX}-${size}`,
            outline ? `${PREFIX}-outline-${variant}` : `${PREFIX}-${variant}`,
            textNoWrap && "text-nowrap"
        )
        const _children = tag === "input" ? undefined : children

        return React.createElement(
            tag!,
            {
                className: classes,
                ref,
                ...restProps
            },
            _children
        )
    }
)

Button.propTypes = {
    variant: PropTypes.oneOf([...Variants, "link"]) as any,
    outline: PropTypes.bool,
    size: PropTypes.oneOf(["sm", "lg"]),
    disabled: PropTypes.bool,
    type: PropTypes.oneOf(["button", "submit", "reset", "checkbox", "radio"]),
    active: PropTypes.bool,
}
Button.defaultProps = {
    variant: "primary",
    textNoWrap: false,
    tag: "button"
}
Button.displayName = "Button"

export default Button