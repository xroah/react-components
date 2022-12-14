import classNames from "classnames";
import React,
{
    FunctionComponent,
    ReactNode
} from "react"
import CloseBtn from "../commons/close-btn";
import {
    ClosableProps,
    DivProps,
    Variant
} from "../commons/types";

export interface AlertProps extends DivProps, ClosableProps {
    variant: Variant
    icon?: ReactNode
}

const Alert: FunctionComponent<AlertProps> = ({
    variant,
    onClose,
    closable,
    className,
    icon,
    children,
    ...restProps
}) => {
    const PREFIX = "alert"
    const classes = classNames(
        PREFIX,
        `${PREFIX}-${variant}`
    )

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

export default Alert