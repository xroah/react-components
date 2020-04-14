import * as React from "react";
import PropTypes from "prop-types";
import {
    classNames,
    variantType,
    variantArray
} from "../utils";
import { ButtonCommonProps } from "../CommonPropsInterface";

export interface CommonProps {
    variant?: variantType | "link";
    outline?: boolean;
    size?: string;
    disabled?: boolean;
}

export interface ButtonProps extends ButtonCommonProps<HTMLButtonElement | HTMLAnchorElement>, CommonProps {
    active?: boolean;
    href?: string;
    block?: boolean;
}

export function handleProps(props: any) {
    const {
        className,
        active,
        size,
        block,
        variant,
        outline,
        ...otherProps
    } = props;

    return {
        ...otherProps,
        className: classNames(
            className,
            "btn",
            otherProps.disabled && "disabled",
            active && "active",
            size && `btn-${size}`,
            block && `btn-block`,
            outline ? `btn-outline-${variant}` : `btn-${variant}`
        )
    };
}

const Button = React.forwardRef(
    (
        {
            children,
            type,
            ...otherProps
        }: ButtonProps,
        ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>
    ) => {
        const props = handleProps(otherProps);
        let tag = "button";
        let buttonProps = {
            ref,
            type,
            ...props
        };

        if (otherProps.href) {
            tag = "a";
            delete buttonProps.disabled;
            delete buttonProps.type;
        } 

        return React.createElement(
            tag,
            buttonProps,
            children
        );
    }
);

export const commonPropTypes = {
    variant: PropTypes.oneOf([...variantArray, "link"] as any),
    outline: PropTypes.bool,
    size: PropTypes.string,
    disabled: PropTypes.bool
} as any;

Button.propTypes = {
    ...commonPropTypes,
    href: PropTypes.string,
    type: PropTypes.oneOf(["button", "submit", "reset"]),
    active: PropTypes.bool,
    block: PropTypes.bool
};
Button.defaultProps = {
    variant: "primary",
    type: "button"
};
Button.displayName = "Button";

export default Button;