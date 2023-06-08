import React, { FC, MouseEvent, ReactNode } from "react"
import { classnames } from "../utils"

export interface PaginationItemProps {
    disabled?: boolean
    active?: boolean
    onClick?: (page?: number) => void
    children?: ReactNode
    page?: number
    className?: string
}

const Item: FC<PaginationItemProps> = ({
    disabled,
    active,
    onClick,
    children,
    page,
    className
}) => {
    const handleClick = (ev: MouseEvent) => {
        ev.preventDefault()
    
        if (!disabled) {
            onClick?.(page)
        }
    }

    return (
        <li className={classnames(
            className,
            "page-item",
            disabled && "disabled"
        )}>
            <a
                href="#"
                onClick={handleClick}
                className={classnames(
                    "page-link",
                    active && "active"
                )}>
                {children}
            </a>
        </li>
    )
}

export default Item