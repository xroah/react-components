import * as React from "react"
import {ControlBtnProps} from "./types"

export default React.forwardRef(
    (
        {
            prefix,
            children,
            ...restProps
        }: ControlBtnProps,
        ref: React.ForwardedRef<HTMLButtonElement>
    ) => {
        return (
            <button
                type="button"
                ref={ref}
                className={prefix}
                {...restProps}>
                <span className={`${prefix}-icon`} />
                {children}
            </button>
        )
    }
)