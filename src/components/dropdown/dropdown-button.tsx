import React, { cloneElement, FC, useRef } from "react"
import { TriggerProps } from "../popup/trigger"
import { classnames } from "../utils"
import { extractPopupProps } from "../popup/popup"
import Button, { ButtonProps } from "../button"
import { OneOf } from "../commons/types"
import Dropdown, { DropdownProps } from "./dropdown"

const dirs = [
    "up",
    "left",
    "right",
    "down"
] as const

type BaseProps = Pick<DropdownProps, "menu"> &
    Omit<TriggerProps, "children" | "overlay" | "anchorRef"> &
    ButtonProps

interface DropdownButtonProps extends BaseProps {
    dir?: OneOf<typeof dirs>
    split?: boolean
}

const DropdownButton: FC<DropdownButtonProps> = (
    {
        className,
        split,
        dir,
        menu,
        children,
        outlined,
        variant,
        size,
        type,
        style,
        ...restProps
    }: DropdownButtonProps
) => {
    const {
        popupProps,
        otherProps
    } = extractPopupProps(restProps)
    const dirMap = new Map([
        ["up", "up"],
        ["down", "down"],
        ["left", "start"],
        ["right", "end"]
    ])
    const classes = classnames(
        className,
        "btn-group",
        dir && `drop${dirMap.get(dir)}`
    )
    const anchorRef = useRef<HTMLButtonElement>(null)
    const BTN_CLASS = "dropdown-toggle"
    const button = (
        <Button
            outlined={outlined}
            size={size}
            variant={variant}
            type={type}
            {...otherProps}>
            {children}
        </Button>
    )
    popupProps.anchorRef = anchorRef

    return (
        <div className={classes} style={style}>
            {split ? button : null}
            <Dropdown menu={menu} {...popupProps}>
                {
                    split ? (
                        <Button
                            className={BTN_CLASS}
                            size={size}
                            outlined={outlined}
                            variant={variant}
                            ref={anchorRef}
                            type={type} />
                    ) : (
                        cloneElement(
                            button,
                            {
                                className: BTN_CLASS,
                                ref: anchorRef
                            }
                        )
                    )
                }
            </Dropdown>
        </div>
    )
}

export default DropdownButton