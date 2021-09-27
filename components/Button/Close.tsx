import * as React from "react"
import PropTypes from "prop-types"
import classNames from "reap-utils/lib/class-names"
import {getPrefixFunc} from "../Commons/utils"

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
        const prefix = getPrefixFunc("btn-close")
        const classes = classNames(
            className,
            prefix(),
            variant && prefix(variant)
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