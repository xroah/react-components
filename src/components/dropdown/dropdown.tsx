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

export default Dropdown