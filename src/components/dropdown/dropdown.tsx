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
        ...restProps
    }: DropdownProps
) => {
    const menuApiRef = useRef<MenuApi>(null)
    const overlay = isValidElement(menu) ?
        menu : <Menu ref={menuApiRef} {...menu as MenuProps} />

    return (
        <Trigger
            trigger={trigger}
            defaultVisible={defaultVisible}
            offset={offset}
            unmountOnHidden={false}
            placement={placement}
            className="r-popup-dropdown"
            overlay={overlay}
            {...restProps}>
            <Anchor menuApiRef={menuApiRef}>
                {children}
            </Anchor>
        </Trigger>
    )
}

export default Dropdown