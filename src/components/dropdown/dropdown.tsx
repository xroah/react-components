import React, {
    cloneElement,
    FC,
    isValidElement,
    KeyboardEvent,
    ReactElement,
    RefObject,
    useRef
} from "react"
import Trigger from "../popup/trigger"
import Menu, {
    handleArrowOrEscKeyDown,
    MenuApi,
    MenuProps
} from "./menu"
import { classnames, isUndef } from "../utils"
import { extractPopupProps } from "r-layers/popup/popup"
import { DivProps } from "../commons/types"
import { PublicProps } from "r-layers/tooltip"
import warning from "warning"

interface DropdownProps extends PublicProps, DivProps {
    menu: ReactElement | MenuProps
    children: ReactElement
    floatingRef?: RefObject<HTMLElement>
}

const Dropdown: FC<DropdownProps> = (
    {
        className,
        menu,
        children,
        trigger,
        defaultVisible,
        floatingRef,
        offset = [2, 0],

        ...restProps
    }: DropdownProps
) => {
    const classes = classnames(className, "dropdown")
    const {
        popupProps,
        otherProps
    } = extractPopupProps(restProps)
    const isElement = isValidElement(menu)
    const menuApiRef = useRef<MenuApi>(null)
    const menuRef = useRef(null)
    const overlay = isElement ? menu : (
        <Menu
            nodeRef={menuRef}
            ref={menuApiRef}
            {...menu} />
    )
    popupProps.overlay = overlay

    if (isElement && isUndef(floatingRef)) {
        warning(
            false,
            `The floatingRef is required, received ${floatingRef}`
        )

        return children
    }

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
    popupProps.floatingRef = isElement ? floatingRef! : menuRef

    return (
        <div className={classes} {...otherProps}>
            <Trigger
                trigger={trigger}
                defaultVisible={defaultVisible}
                transition={false}
                offset={offset}
                unmountOnHidden={false}
                {...popupProps}>
                {newChildren}
            </Trigger>
        </div>
    )
}

export default Dropdown