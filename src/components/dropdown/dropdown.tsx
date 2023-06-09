import React, {
    FC,
    isValidElement,
    ReactElement,
    useRef
} from "react"
import Trigger from "../popup/trigger"
import Menu, { MenuApi, MenuProps } from "./menu"
import { OverlayProps } from "../tooltip"
import Anchor from "./anchor"
import { classnames } from "r-components/utils"
import { styled } from "styled-components"

export interface DropdownProps extends Omit<OverlayProps, "title"> {
    menu: ReactElement | MenuProps
}

const Dropdown: FC<DropdownProps> = (
    {
        menu,
        children,
        trigger,
        placement = "bottom-end",
        defaultVisible,
        offset = [2, 0],
        className,
        ...restProps
    }: DropdownProps
) => {
    const menuApiRef = useRef<MenuApi>(null)
    const overlay = isValidElement(menu) ?
        menu : <Menu ref={menuApiRef} {...menu as MenuProps} />
    const classes = classnames(className, "r-popup-dropdown")

    return (
        <Trigger
            trigger={trigger}
            defaultVisible={defaultVisible}
            offset={offset}
            unmountOnHidden={false}
            placement={placement}
            className={classes}
            overlay={overlay}
            {...restProps}>
            <Anchor menuApiRef={menuApiRef}>
                {children}
            </Anchor>
        </Trigger>
    )
}

export default styled(Dropdown)`
& {
    >* {
        transition: transform .15s cubic-bezier(.9, .24, .14, .92);
        transform-origin: center top;
    }

    &:not(.show)>* {
        transform: scaleY(.5);
    }

    &.r-popup-top,
    &.r-popup-top-start,
    &.r-popup-top-end {
        >* {
            transform-origin: center bottom;
        }
    }
}
`