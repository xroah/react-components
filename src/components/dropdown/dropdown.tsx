import React, {
    cloneElement,
    FC,
    isValidElement,
    KeyboardEvent,
    ReactElement,
    useRef
} from "react"
import Trigger from "../popup/trigger"
import Menu, {
    handleArrowOrEscKeyDown,
    MenuApi,
    MenuProps
} from "./menu"
import { classnames } from "../utils"
import { extractPopupProps } from "../popup/popup"
import { OverlayProps } from "../tooltip"

export interface DropdownProps extends Omit<OverlayProps, "title"> {
    menu: ReactElement | MenuProps
}

const Dropdown: FC<DropdownProps> = (
    {
        className,
        menu,
        children,
        trigger,
        placement = "bottom-end",
        defaultVisible,
        offset = [2, 0],
        ...restProps
    }: DropdownProps
) => {
    const classes = classnames(className, "dropdown")
    const {
        popupProps,
        otherProps
    } = extractPopupProps(restProps)
    const menuApiRef = useRef<MenuApi>(null)
    const overlay = isValidElement(menu) ?
        menu : <Menu ref={menuApiRef} {...menu as MenuProps} />
    popupProps.overlay = overlay

    const newChildren = cloneElement(
        children,
        {
            onKeyDown(ev: KeyboardEvent) {
                const menuApi = menuApiRef.current

                children.props.onKeyDown?.(ev)

                if (!menuApi) {
                    return
                }

                handleArrowOrEscKeyDown(
                    ev,
                    {
                        onArrowDown() {
                            menuApi.showMenu()
                            setTimeout(menuApi.focusFirst)
                        },
                        onArrowUp() {
                            menuApi.showMenu()
                            setTimeout(menuApi.focusLast)
                        },
                        onEscape: menuApi.escape
                    }
                )
            }
        }
    )

    return (
        <div className={classes} {...otherProps}>
            <Trigger
                trigger={trigger}
                defaultVisible={defaultVisible}
                offset={offset}
                unmountOnHidden={false}
                placement={placement}
                className="r-popup-dropdown"
                {...popupProps}>
                {newChildren}
            </Trigger>
        </div>
    )
}

export default Dropdown