import * as React from "react";
import PropTypes from "prop-types";
import Button from "../Button";
import Dropdown, { DropdownProps } from "./Dropdown";
import { variantType } from "../../utils";

export interface DropdownButtonProps extends DropdownProps {
    variant?: variantType;
    outline?: boolean;
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
        fade,
        size,
        split,
        children,
        className,
        onShow,
        onShown,
        onHide,
        onHidden,
        delay,
        style,
        popupMountNode,
        ...otherProps
    } = props;
    const dropdownProps = {
        placement,
        alignment,
        overlay,
        fade,
        delay,
        onShow,
        onShown,
        onHide,
        style,
        popupMountNode,
        onHidden
    };
    const btn = (
        <Button {...otherProps}>{children}</Button>
    );
    const dropdown = (
        <Dropdown {...dropdownProps}>
            <Button
                className="dropdown-toggle-split"
                {...otherProps} />
        </Dropdown>
    );

    if (split) {
        return (
            <Button.Group
                className={className}
                size={size}>
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