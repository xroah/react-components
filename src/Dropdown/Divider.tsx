import * as React from "react"
import classNames from "reap-utils/lib/class-names"

export default function DropdownDivider(
    {className, ...restProps}: React.HTMLAttributes<HTMLHRElement>
) {
    const classes = classNames(className, "dropdown-divider")

    return <hr className={classes} {...restProps}/>
}