import * as React from "react"
import classNames from "reap-utils/lib/class-names"

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
            ...restProps
        },
        ref
    ) => {
        const PREFIX = "dropdown-item"
        let tag = "button"
        let classes = classNames(
            className,
            text ? `${PREFIX}-text` : PREFIX,
            active && "active",
            disabled && "disabled"
        )

        if (text) {
            tag = "span"
        } else if ("href" in restProps) {
            tag = "a"
        }

        return React.createElement(
            tag,
            {
                disabled: tag === "button" ? disabled : undefined,
                className: classes,
                ref,
                ...restProps
            }
        )
    }
)

export default DropdownItem