import * as React from "react"
import classNames from "reap-utils/lib/class-names"
import Badge, {BadgeProps} from "./Badge"

export default function Positioned(
    {
        className,
        pill = true,
        variant = "danger",
        ...restProps
    }: BadgeProps
) {
    const classes = classNames(
        className,
        "position-absolute",
        "top-0",
        "start-100",
        "translate-middle"
    )

    return (
        <Badge
            className={classes}
            pill={true}
            variant={variant}
            {...restProps}
        />
    )
}