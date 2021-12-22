import * as React from "react"
import {ButtonAttrs} from "../Commons/consts-and-types"

interface IndicatorProps extends Omit<ButtonAttrs, "onClick"> {
    index: number 
    onClick?: (i: number) => void
}

export default React.forwardRef(
    (
        {
            index,
            onClick,
            ...restProps
        }: IndicatorProps,
        ref: React.ForwardedRef<HTMLButtonElement>
    ) => {
        const handleClick = () => {
            if (onClick) {
                onClick(index)
            }
        }

        return (
            <button
                type="button"
                data-bs-target
                ref={ref}
                onClick={handleClick}
                {...restProps} />
        )
    }
) 