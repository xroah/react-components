import * as React from "react"
import PropTypes from "prop-types"
import classNames from "reap-utils/lib/class-names"
import {Variant, variants} from "../Commons/variants"
import {AnchorCommonProps} from "../Commons/CommonPropsInterface"
import warning from "warning"
import {getPrefixFunc} from "../Commons/utils"

type BaseProps = Omit<React.ButtonHTMLAttributes<HTMLElement>, "type">

let uuid = 0

export interface ButtonProps extends BaseProps, AnchorCommonProps {
    variant?: Variant | "link"
    outline?: boolean
    size?: "sm" | "lg"
    disabled?: boolean
    active?: boolean
    textNoWrap?: boolean
    tag?: React.ElementType
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
            type,
            id = `bs-btn-${uuid++}`,
            ...restProps
        }: ButtonProps,
        ref: React.Ref<HTMLElement & HTMLInputElement>
    ) => {
        const prefix = getPrefixFunc("btn")
        const check = type === "checkbox" || type === "radio"
        const classes = classNames(
            className,
            prefix(),
            disabled && "disabled",
            active && "active",
            size && prefix(size),
            outline ? prefix(`outline-${variant}`) : prefix(variant),
            textNoWrap && "text-nowrap"
        )
        let _children = children

        if (tag === undefined) {
            if (check) {
                tag = "input"
            } else if ("href" in restProps) {
                tag = "a"
            } else {
                tag = "button"
            }
        }

        warning(
            !(check && tag !== "input"),
            `Checkbox or radio type should along with 'input' tag,
            received '${tag}'`
        )

        if (tag === "input") {
            if (check) {
                const label = (
                    <label className={classes} htmlFor={id}>
                        {_children}
                    </label>
                )

                return (
                    <>
                        <input
                            id={id}
                            className={prefix("check")}
                            ref={ref}
                            type={type}
                            {...restProps}
                        />
                        {label}
                    </>
                )
            }

            _children = undefined
        }

        return React.createElement(
            tag!,
            {
                className: classes,
                ref,
                type,
                ...restProps
            },
            children
        )
    }
)

Button.propTypes = {
    tag: PropTypes.elementType as any,
    variant: PropTypes.oneOf([...variants, "link"]) as any,
    outline: PropTypes.bool,
    size: PropTypes.oneOf(["sm", "lg"]),
    disabled: PropTypes.bool,
    type: PropTypes.oneOf(["button", "submit", "reset", "checkbox", "radio"]),
    active: PropTypes.bool,
}
Button.defaultProps = {
    variant: "primary",
    textNoWrap: false,
}
Button.displayName = "Button"

export default Button