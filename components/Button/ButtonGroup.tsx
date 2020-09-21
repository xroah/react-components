import * as React from "react"
import PropTypes from "prop-types"
import { classNames } from "../utils"
import { CommonProps } from "../Common/CommonPropsInterface"

export interface ButtonGroupProps extends CommonProps<HTMLDivElement> {
    size?: "sm" | "lg"
    vertical?: boolean
}

export default function ButtonGroup(props: ButtonGroupProps) {
    const {
        className,
        size,
        vertical,
        children,
        ...otherProps
    } = props
    const PREFIX = "btn-group"

    return (
        <div
            className={
                classNames(
                    className,
                    vertical ? `${PREFIX}-vertical` : PREFIX,
                    size && `${PREFIX}-${size}`,
                )
            }
            {...otherProps}>
            {children}
        </div>
    )
}

ButtonGroup.propTypes = {
    vertical: PropTypes.bool,
    size: PropTypes.oneOf(["sm", "lg"])
}

ButtonGroup.defaultProps = {
    vertical: false
}