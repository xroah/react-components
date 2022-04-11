import * as React from "react"
import classNames from "reap-utils/lib/class-names"
import {isValidNode} from "reap-utils/lib/react"
import {DivProps} from "../Commons/common-types"

interface MenuProps extends DivProps {
    dark?: boolean
    header?: React.ReactNode
}

const DropdownMenu = React.forwardRef<HTMLDivElement, MenuProps>(
    (
        {
            dark,
            header,
            className,
            children,
            style,
            ...restProps
        },
        ref
    ) => {
        const newStyle = {...style}
        const PREFIX = "dropdown-menu"
        const classes = classNames(
            className,
            PREFIX,
            "show",
            dark && `${PREFIX}-dark`
        )

        if (!("position" in newStyle)) {
            newStyle.position = "initial"
        }

        return (
            <div
                ref={ref}
                className={classes}
                style={newStyle}
                {...restProps} >
                {
                    isValidNode(header) && (
                        <h6 className="dropdown-header">{header}</h6>
                    )
                }
                {children}
            </div>
        )
    }
)

export default DropdownMenu