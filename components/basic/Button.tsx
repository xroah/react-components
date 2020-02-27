import * as React from "react";
import PropTypes from "prop-types";
import ButtonGroup, { ButtonGroupProps } from "./ButtonGroup";
import {
    createComponentByClass,
    classNames,
    variantType,
    variantArray
} from "../utils";
import { ButtonCommonProps } from "../CommonPropsInterface";

export interface ButtonProps extends ButtonCommonProps<HTMLButtonElement> {
    variant?: variantType | "link";
    outline?: boolean;
    size?: string;
    active?: boolean;
    block?: boolean;
    disabled?: boolean;
    href?: string;
}

interface ButtonInterface {
    Group: React.FunctionComponent<ButtonGroupProps>;
    Toolbar: React.FunctionComponent<React.HTMLAttributes<HTMLDivElement>>
}

type ButtonType = ButtonInterface & React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

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
    }: ButtonProps,
        ref: React.Ref<HTMLButtonElement>
    ) => {
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
        } else {
            delete props.href;
        }

        return React.createElement(
            tag,
            props,
            children
        );
    }
) as ButtonType;

Button.propTypes = {
    variant: PropTypes.oneOf([...variantArray, "link"] as any),
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

Button.Group = ButtonGroup as React.FunctionComponent<ButtonGroupProps>;
Button.Toolbar = createComponentByClass({
    className: "btn-toolbar",
    displayName: "ButtonToolbar"
});

export default Button;