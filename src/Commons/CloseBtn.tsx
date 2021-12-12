import * as React from "react"
import {classNames} from "reap-utils/lib"
import {ClosableProps} from "./common-types"

export default function CloseBtn(
    {
        className,
        onClose,
        ...restProps
    }: React.ButtonHTMLAttributes<HTMLButtonElement> & ClosableProps
) {
    const handleClick = () => {
        if (onClose) {
            onClose("close")
        }
    }

    return (
        <button
            type="button"
            aria-label="close"
            onClick={handleClick}
            className={classNames(className, "btn-close")}
            {...restProps} />
    )
}