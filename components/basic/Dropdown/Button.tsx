import * as React from "react";
import PropTypes from "prop-types";
import Button from "../Button";
import Dropdown from "./Dropdown";
import { DropdownProps } from "./DropdownInner";
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
        className,
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

    if (split) {
        const btn = (
            <Button {...otherProps}>{children}</Button>
        );
        const {
            className,
            style,
            ...restProps
        } = dropdownProps;
        const dropdown = (
            <Dropdown {...restProps}>
                <Button
                    className="dropdown-toggle-split"
                    {...otherProps} />
            </Dropdown>
        );

        return (
            <Button.Group
                className={className}
                style={style}
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