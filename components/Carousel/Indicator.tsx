import * as React from "react"
import {classNames} from "reap-utils"
import {IndicatorProps} from "./types"

export default React.forwardRef(
    (
        {
            className,
            active,
            index,
            onClick,
            ...restProps
        }: IndicatorProps,
        ref: React.ForwardedRef<HTMLButtonElement>
    ) => {
        const classes = classNames(
            classNames,
            active && "active"
        )
        const handleClick = () => {
            if (onClick) {
                onClick(index)
            }
        }

        return (
            <button
                className={classes}
                type="button"
                data-bs-target
                ref={ref}
                onClick={handleClick}
                {...restProps} />
        )
    }
) 