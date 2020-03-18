import * as React from "react";
import PropTypes from "prop-types";
import Button from "../Button";
import { ButtonProps } from "../Button/Button";
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
    btnProps?: ButtonProps;
    splitBtnProps?: ButtonProps;
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
        onShow,
        onShown,
        onHide,
        onHidden,
        delay,
        variant,
        disabled,
        outline,
        href,
        popupMountNode,
        btnProps,
        splitBtnProps,
        className,
        style,
        ...otherProps
    } = props;
    const dropdownProps = {
        className,
        style,
        placement,
        alignment,
        overlay,
        fade,
        delay,
        onShow,
        onShown,
        onHide,
        popupMountNode,
        onHidden
    };
    const _btnProps = {
        variant,
        disabled,
        outline,
        href
    };
    
    if (split) {
        const btn = (
            <Button {...{
                ..._btnProps,
                ...btnProps
            }}>{children}</Button>
        );

        delete dropdownProps.className;
        delete dropdownProps.style;

        const dropdown = (
            <Dropdown {...dropdownProps}>
                <Button
                    className="dropdown-toggle-split"
                    {...{
                        ..._btnProps,
                        ...splitBtnProps
                    }} />
            </Dropdown>
        );

        return (
            <Button.Group
                size={size}
                className={className}
                style={style}
                {...otherProps}>
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
                {...{
                    ..._btnProps,
                    ...otherProps,
                    ...btnProps,
                }}>
                {children}
            </Button>
        </Dropdown>
    );

}

DropdownButton.propTypes = {
    split: PropTypes.bool,
    btnProps: PropTypes.object,
    splitBtnProps: PropTypes.object
};