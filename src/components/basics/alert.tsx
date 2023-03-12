import React, { FC, ReactNode } from "react"
import CloseBtn from "./close-btn"
import {
    ClosableProps,
    DivProps,
    Variant
} from "../commons/types"
import { node, oneOf } from "prop-types"
import { variants } from "../commons/constants"
import { closablePropTypes } from "../commons/prop-types"

export interface AlertProps extends DivProps, ClosableProps {
    variant: Variant
    icon?: ReactNode
}

const Alert: FC<AlertProps> = ({
    variant,
    onClose,
    closable,
    className,
    icon,
    children,
    ...restProps
}) => {
    const PREFIX = "alert"
    const classes = `${PREFIX} ${PREFIX}-${variant} `

    return (
        <div className={classes} {...restProps}>
            <div className="alert-body">
                {icon}
                {children}
            </div>
            {closable ? <CloseBtn onClick={onClose} /> : null}
        </div>
    )
}

Alert.propTypes = {
    icon: node,
    variant: oneOf(variants).isRequired,
    ...closablePropTypes
}

export default Alert