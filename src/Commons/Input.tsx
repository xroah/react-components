import * as React from "react"
import {classNames} from "reap-utils/lib"
import {handleFuncProp} from "reap-utils/lib/react"
import {Size} from "./common-types"

interface InputProps {
    size?: Size
    type?: React.HTMLInputTypeAttribute
    defaultValue?: string
    className?: string
    onOk?: (evt: React.KeyboardEvent) => void
    onCancel?: (evt: React.KeyboardEvent) => void
}

const Input = React.forwardRef(
    (
        {
            size,
            type,
            defaultValue,
            className,
            onOk,
            onCancel
        }: InputProps,
        ref: React.ForwardedRef<HTMLInputElement>
    ) => {
        const PREFIX = "form-control"
        const classes = classNames(
            className,
            PREFIX,
            size && `${PREFIX}-size`
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
                ref={ref} />
        )
    }
)

export default Input