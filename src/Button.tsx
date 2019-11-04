import * as React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement & HTMLAnchorElement> {
    variant?: "primary" |
        "secondary" |
        "success" |
        "danger" |
        "warning" |
        "info" |
        "dark" |
        "light" |
        "link";
    outline?: boolean;
    size?: string;
    active?: boolean;
    block?: boolean;
    disabled?: boolean;
    href?: string;
    type?: "button" | "submit" | "reset";
}

const Button = React.forwardRef(
    ({
         variant,
         size,
         className,
         active,
         block,
         outline,
         children,
         type,
         disabled,
         ...otherProps
     }: ButtonProps, ref: React.Ref<any>) => {
        const classes = classNames(
            "btn",
            className,
            disabled && "disabled",
            active && "active",
            size && `btn-${size}`,
            block && `btn-block`,
            outline ? `btn-outline-${variant}` : `btn-${variant}`
        );
        let tag = "button";
        let props = {
            className: classes,
            ref,
            type,
            disabled,
            ...otherProps
        };

        if (otherProps.href) {
            tag = "a";
            delete props.disabled;
            delete props.type;
        }

        return React.createElement(
            tag,
            props,
            children
        );
    }
);

Button.propTypes = {
    variant: PropTypes.oneOf([
        "primary",
        "secondary",
        "success",
        "danger",
        "warning",
        "info",
        "dark",
        "light",
        "link"
    ]),
    outline: PropTypes.bool,
    size: PropTypes.string,
    active: PropTypes.bool,
    block: PropTypes.bool,
    disabled: PropTypes.bool,
    href: PropTypes.string,
    type: PropTypes.oneOf(["button", "submit", "reset"])
};
Button.defaultProps = {
    variant: "primary",
    type: "button"
};
Button.displayName = "Button";

export default Button;