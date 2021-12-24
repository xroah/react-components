import * as React from "react"
import classNames from "reap-utils/lib/class-names"
import {ACTIVE_CLASS} from "../Commons/consts-and-types"
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
            active && ACTIVE_CLASS
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
                data-bs-target // bootstrap need this for css
                ref={ref}
                onClick={handleClick}
                {...restProps} />
        )
    }
) 