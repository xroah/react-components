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
    visible,
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
        `${PREFIX}-${variant}`,
        closable && `${PREFIX}-dismissible`
    )

    return (
        <div className={classes} {...restProps}>
            {icon}
            {children}
            {closable ? <CloseBtn onClick={onClose}/> : null}
        </div>
    )
}

export default Alert