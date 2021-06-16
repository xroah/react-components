import * as React from "react"
import classNames from "reap-utils/lib/class-names"

export default function ButtonToolbar(
    {
        className,
        ...restProps
    }: React.HTMLAttributes<HTMLDivElement>
) {
    const classes = classNames(className, "btn-toolbar")

    return (
        <div
            role="toolbar"
            className={classes}
            {...restProps} />
    )
}