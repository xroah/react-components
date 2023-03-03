import React, {
    CSSProperties,
    FunctionComponent,
    ReactNode
} from "react"
import { ClosableProps, DivPropsWithNodeTitle } from "../commons/types";
import { classnames } from "../utils";
import CloseBtn from "./close-btn";
import { getNullableNode } from "../utils/react";

interface ToastProps extends DivPropsWithNodeTitle, ClosableProps {
    header?: ReactNode
    icon?: ReactNode,
    secondaryTitle?: ReactNode
}

const Toast: FunctionComponent<ToastProps> = ({
    className,
    header,
    icon,
    title,
    secondaryTitle,
    closable = true,
    onClose,
    children,
    ...restProps
}) => {
    const classes = classnames(
        className,
        "toast",
        "show"
    )
    const titleStyle: CSSProperties = {
        marginLeft: icon ? "15px" : "",
        marginRight: "auto"
    }
    const HEADER_CLASS = "toast-header"
    const headerNode = getNullableNode(header)
    const _header = headerNode === false ? (
        <div className={HEADER_CLASS}>
            {icon}
            <strong style={titleStyle}>
                {title}
            </strong>
            <small>{secondaryTitle}</small>
            {closable ? <CloseBtn onClick={onClose} /> : null}
        </div>
    ) : headerNode

    return (
        <div className={classes} {...restProps}>
            {_header}
            <div className="toast-body">
                {children}
            </div>
        </div>
    )
}

export default Toast