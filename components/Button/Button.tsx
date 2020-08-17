import * as React from "react";
import PropTypes from "prop-types";
import {
    classNames,
    variantType,
    variantArray
} from "../utils";
import { ButtonCommonProps } from "../Common/CommonPropsInterface";
import omitProps from "../utils/omitProps";

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
    target?: string;
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
    const PREFIX = "btn";

    return {
        ...otherProps,
        className: classNames(
            className,
            PREFIX,
            otherProps.disabled && "disabled",
            active && "active",
            size && `${PREFIX}-${size}`,
            block && `${PREFIX}-block`,
            outline ? `${PREFIX}-outline-${variant}` : `${PREFIX}-${variant}`
        )
    };
}

const Button = React.forwardRef(
    (
        {
            children,
            type,
            target,
            ...otherProps
        }: ButtonProps,
        ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>
    ) => {
        let tag = "button";
        let buttonProps = {
            ref,
            type,
            ...handleProps(otherProps)
        };

        if (otherProps.href) {
            tag = "a";
            
            buttonProps.target = target;

            omitProps(
                buttonProps,
                ["disabled", "type"]
            );
        }

        return React.createElement(
            tag,
            buttonProps,
            children
        );
    }
);

export const groupType = PropTypes.oneOf(["checkbox", "radio"]);

export const commonPropTypes = {
    variant: PropTypes.oneOf([...variantArray, "link"]) as any,
    outline: PropTypes.bool,
    size: PropTypes.string,
    disabled: PropTypes.bool
};

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