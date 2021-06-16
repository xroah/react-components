import * as React from "react"
import PropTypes from "prop-types"
import classNames from "reap-utils/lib/class-names"
import omit from "reap-utils/lib/omit"

type BaseProps = React.ButtonHTMLAttributes<HTMLButtonElement>

interface CloseProps extends BaseProps {
    variant?: "white"
}

const Close = React.forwardRef(
    (
        {
            className,
            variant,
            ...restProps
        }: CloseProps
    ) => {
        const PREFIX = "btn-close"
        const classes = classNames(
            className,
            PREFIX,
            variant && `${PREFIX}-${variant}`
        )

        return (
            <button
                className={classes}
                {...omit(restProps, "children")} />
        )
    }
)

Close.propTypes = {
    variant: PropTypes.oneOf(["white"])
}
Close.displayName = "CloseButton"

export default Close