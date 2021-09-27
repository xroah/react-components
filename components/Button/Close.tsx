import * as React from "react"
import PropTypes from "prop-types"
import classNames from "reap-utils/lib/class-names"

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
        }: CloseProps,
        ref: React.Ref<HTMLButtonElement>
    ) => {
        const PREFIX = "btn-close"
        const classes = classNames(
            className,
            PREFIX,
            variant && `${PREFIX}-${variant}`
        )

        return (
            <button
                ref={ref}
                className={classes}
                {...restProps} />
        )
    }
)

Close.propTypes = {
    variant: PropTypes.oneOf(["white"])
}
Close.displayName = "CloseButton"

export default Close