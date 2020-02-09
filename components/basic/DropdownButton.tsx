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
        alignment,
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
        alignment,
        overlay,
        trigger,
        flip,
        fade
    };
    const btn = (
        <Button
            variant={variant}
            disabled={disabled}
            href={href}
            {...otherProps}>{children}</Button>
    );
    const dropdown = (
        <Dropdown {...dropdownProps}>
            <Button
                className={classNames(className, "dropdown-toggle-split")}
                variant={variant}
                disabled={disabled} />
        </Dropdown>
    );

    if (split) {
        return (
            <Button.Group size={size}>
                {
                    placement === "left" ?
                        <>{dropdown}{btn}</> :
                        <>{btn}{dropdown}</>
                }
            </Button.Group>
        );
    }

    return (
        <Dropdown {...dropdownProps}>
            <Button
                className={className}
                variant={variant}
                disabled={disabled}
                size={size}
                href={href}
                {...otherProps}>
                {children}
            </Button>
        </Dropdown>
    );

}

DropdownButton.propTypes = {
    split: PropTypes.bool
};