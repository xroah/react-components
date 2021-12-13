import * as React from "react"
import {classNames} from "reap-utils/lib"
import {handleFuncProp} from "reap-utils/lib/react"
import {Size} from "./common-types"

type Base = React.InputHTMLAttributes<HTMLInputElement>

export interface InputProps extends Base {
    htmlSize?: Size
}

interface Callbacks {
    onOk?: (evt: React.KeyboardEvent) => void
    onCancel?: (evt: React.KeyboardEvent) => void
}

const Input = React.forwardRef(
    (
        {
            htmlSize,
            type,
            defaultValue,
            className,
            onOk,
            onCancel,
            ...restProps
        }: InputProps & Callbacks,
        ref: React.ForwardedRef<HTMLInputElement>
    ) => {
        const PREFIX = "form-control"
        const classes = classNames(
            className,
            PREFIX,
            htmlSize && `${PREFIX}-size`
        )
        const handleKeyDown = (evt: React.KeyboardEvent) => {
            const key = evt.key.toLowerCase()

            if (key === "enter") {
                handleFuncProp(onOk)(evt)
            } else if (key === "escape") {
                handleFuncProp(onCancel)(evt)
            }
        }

        return (
            <input
                type={type}
                defaultValue={defaultValue}
                className={classes}
                onKeyDown={handleKeyDown}
                ref={ref}
                {...restProps} />
        )
    }
)

export default Input