import React, {
    ButtonHTMLAttributes,
    FC,
    ReactNode,
    RefObject
} from "react"
import { classnames } from "../utils"

type BaseProps = Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "type" | "children"
>

export interface MenuItemProps extends BaseProps {
    type?: "item" | "divider"
    label: ReactNode
    command?: string
    icon?: ReactNode
    disabled?: boolean
}

interface ItemProps extends MenuItemProps {
    // for internal
    _btnRef?: RefObject<HTMLButtonElement>
}

const MenuItem: FC<ItemProps> = (
    {
        type,
        label,
        icon,
        className,
        _btnRef,
        ...restProps
    }: ItemProps
) => {
    return (
        type === "item" ? (
            <button
                type="button"
                className={classnames(className, "dropdown-item")}
                ref={_btnRef}
                {...restProps}>
                {icon}{label}
            </button>
        ) : type === "divider" ? (
            <hr className="dropdown-divider" />
        ) : null
    )
}

export default MenuItem