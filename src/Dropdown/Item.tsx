import * as React from "react"
import classNames from "reap-utils/lib/class-names"
import {DropdownContext} from "./Dropdown"

type E = HTMLSpanElement | HTMLAnchorElement | HTMLButtonElement

interface ItemProps extends
    React.HTMLAttributes<HTMLButtonElement & HTMLAnchorElement> {
    text?: boolean
    active?: boolean
    disabled?: boolean
}

const DropdownItem = React.forwardRef<E, ItemProps>(
    (
        {
            text,
            active,
            disabled,
            className,
            onClick,
            ...restProps
        },
        ref
    ) => {
        const PREFIX = "dropdown-item"
        const ctx = React.useContext(DropdownContext)
        let handleClick = onClick
        let tag = "button"
        let classes = classNames(
            className,
            text ? `${PREFIX}-text` : PREFIX,
            active && "active",
            disabled && "disabled"
        )

        if (text) {
            tag = "span"
        } else {
            if ("href" in restProps) {
                tag = "a"
            }

            handleClick = React.useCallback(
                (evt: React.MouseEvent) => {
                    evt.preventDefault()
                    onClick?.(evt as any)
                    ctx.close?.()
                },
                [onClick]
            )
        }

        return React.createElement(
            tag,
            {
                disabled: tag === "button" ? disabled : undefined,
                className: classes,
                ref,
                onClick: text ? onClick : handleClick,
                ...restProps
            }
        )
    }
)

export default DropdownItem