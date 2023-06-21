import React, {
    ButtonHTMLAttributes,
    ForwardedRef,
    forwardRef,
    useState,
    MouseEvent
} from "react"
import { OneOf, Variant } from "../commons/types"
import { classnames, isUndef } from "../utils"
import { sizes } from "../commons/constants"

export interface ButtonProps extends
    ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant
    size?: OneOf<typeof sizes>
    outlined?: boolean
    toggle?: boolean
    active?: boolean
    defaultActive?: boolean
}

const Button = forwardRef(
    (
        {
            className,
            size,
            outlined,
            variant = "primary",
            type = "button",
            toggle,
            active: propActive,
            defaultActive = false,
            onClick,
            ...restProps
        }: ButtonProps,
        ref: ForwardedRef<HTMLButtonElement>
    ) => {
        const [_active, setActive] = useState(defaultActive)
        const classes = classnames(
            className,
            "btn",
            outlined ? `btn-outline-${variant}` : `btn-${variant}`,
            size && `btn-${size}`,
            toggle && (propActive ?? _active) && "active"
        )
        const handleClick = (ev: MouseEvent<HTMLButtonElement>) => {
            onClick?.(ev)
            
            if (toggle && isUndef(propActive)) {
                setActive(!_active)
            }
        }

        return (
            <button
                type={type}
                ref={ref}
                className={classes}
                onClick={handleClick}
                {...restProps} />
        )
    }
)
Button.displayName = "Button"

export default Button