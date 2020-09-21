import * as React from "react"
import PropTypes from "prop-types"
import Button from "../Button"
import { ButtonProps } from "../Button/Button"
import Dropdown from "./Dropdown"
import { DropdownProps } from "./DropdownInner"
import { variantType } from "../utils"

export interface DropdownButtonProps extends DropdownProps {
    variant?: variantType
    outline?: boolean
    disabled?: boolean
    href?: string
    size?: "sm" | "lg"
    split?: boolean
    render?: (buttons: React.ReactElement[]) => React.ReactNode[]
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
        render,
        className,
        style,
        ...otherProps
    } = props
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
    }
    const btnProps = {
        variant,
        disabled,
        outline,
        href
    }

    if (split) {
        let leftBtn = (
            <Button {...btnProps}>{children}</Button>
        )
        let rightBtn = (
            <Button
                className="dropdown-toggle-split"
                {...btnProps} />
        )

        if (placement === "left") {
            [leftBtn, rightBtn] = [rightBtn, leftBtn]
        }

        const [_leftBtn, _rightBtn] = render!([leftBtn, rightBtn])

        delete dropdownProps.className
        delete dropdownProps.style

        return (
            <Button.Group
                size={size}
                className={className}
                style={style}
                {...otherProps}>
                {
                    // place dropdown button left
                    placement === "left" ?
                        (
                            <>
                                <Dropdown {...dropdownProps}>
                                    {_leftBtn}
                                </Dropdown>
                                {_rightBtn}
                            </>
                        ) :
                        (
                            <>
                                {_leftBtn}
                                <Dropdown {...dropdownProps}>
                                    {_rightBtn}
                                </Dropdown>
                            </>
                        )
                }
            </Button.Group>
        )
    }

    let btn = (
        <Button
            size={size}
            {...{
                ...btnProps,
                ...otherProps,
            }}>
            {children}
        </Button>
    )
    const [_btn] = render!([btn])

    return (
        <Dropdown {...dropdownProps}>
            {_btn}
        </Dropdown>
    )
}

DropdownButton.propTypes = {
    split: PropTypes.bool,
    btnProps: PropTypes.object,
    splitBtnProps: PropTypes.object
}
DropdownButton.defaultProps = {
    render: (buttons: React.ReactNode[]) => buttons
}