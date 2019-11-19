import * as React from "react";
import PropTypes from "prop-types";
import ButtonGroup from "./ButtonGroup";
import {
    createComponentByClass,
    classNames,
    variantType,
    variantArray
} from "./utils";

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement & HTMLAnchorElement> {
    variant?: variantType | "link";
    outline?: boolean;
    size?: string;
    active?: boolean;
    block?: boolean;
    disabled?: boolean;
    href?: string;
    type?: "button" | "submit" | "reset";
}

const Button: any = React.forwardRef(
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
            className,
            "btn",
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
    variant: PropTypes.oneOf(variantArray),
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

Button.Group = ButtonGroup;
Button.Toolbar = createComponentByClass({
    className: "btn-toolbar",
    displayName: "ButtonToolbar"
});

export default Button;