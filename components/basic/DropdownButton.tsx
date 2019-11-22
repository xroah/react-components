import * as React from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import Dropdown, { DropdownProps } from "./Dropdown";
import { classNames, variantType } from "../utils";

export interface DropdownButtonProps extends DropdownProps {
    variant?: variantType;
    disabled?: boolean;
    href?: string;
    size?: "sm" | "lg";
    split?: boolean;
}

export default function DropdownButton(props: DropdownButtonProps) {

    const {
        placement,
        align,
        overlay,
        trigger,
        flip,
        fade,
        variant,
        disabled,
        href,
        size,
        split,
        children,
        className,
        ...otherProps
    } = props;
    const dropdownProps = {
        placement,
        align,
        overlay,
        trigger,
        flip,
        fade
    };
    const classes = classNames(className, "dropdown-toggle");

    if (split) {
        return (
            <Button.Group size={size} className={className}>
                <Button
                    variant={variant}
                    disabled={disabled}
                    href={href}
                    {...otherProps}>{children}</Button>
                <Dropdown {...dropdownProps}>
                    <Button
                        className="dropdown-toggle dropdown-toggle-split"
                        variant={variant}
                        disabled={disabled} />
                </Dropdown>
            </Button.Group>
        );
    }

    return (
        <Dropdown {...dropdownProps}>
            <Button
                className={classes}
                variant={variant}
                disabled={disabled}
                size={size}
                {...otherProps}>
                {children}
            </Button>
        </Dropdown>
    );

}

DropdownButton.propTypes = {
    split: PropTypes.bool
};