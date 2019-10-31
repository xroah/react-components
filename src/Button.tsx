import * as React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement & HTMLAnchorElement> {
    variant?: string;
    outline?: boolean;
    size?: string;
    active?: boolean;
    block?: boolean;
    disabled?: boolean;
    href?: string;
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
         disabled,
         ...otherProps
     }: ButtonProps, ref: React.Ref<any>) => {
        const classNames = classnames(
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
            className: classNames,
            ref,
            disabled,
            ...otherProps
        };

        if (otherProps.href) {
            tag = "a";
            delete props.disabled;
        }

        return React.createElement(
            tag,
            props,
            children
        );
    }
);

const propTypes = {
    variant: PropTypes.string,
    outline: PropTypes.bool,
    size: PropTypes.string,
    active: PropTypes.bool,
    block: PropTypes.bool,
    disabled: PropTypes.bool,
    href: PropTypes.string
};

const defaultProps = {
    variant: "primary"
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
Button.displayName = "Button";

export default Button;