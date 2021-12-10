import * as React from "react"
import {classNames} from "reap-utils/lib"

export default function CloseBtn(
    {
        className,
        ...restProps
    }: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
    return (
        <button
            type="button"
            aria-label="close"
            className={classNames(className, "btn-close")}
            {...restProps} />
    )
}