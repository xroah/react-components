import React, { FC, ReactNode } from "react"
import {
    ClosableProps,
    DivPropsWithNodeTitle,
    Variant
} from "../commons/types"
import { classnames } from "../utils"
import CloseBtn from "../basics/close-btn"
import { getNullableNode } from "../utils/react"

export interface ToastInnerProps extends
    DivPropsWithNodeTitle, ClosableProps {
    header?: ReactNode
    icon?: ReactNode,
    secondaryTitle?: ReactNode
    simple?: boolean
    variant?: Variant
}

const ToastInner: FC<ToastInnerProps> = ({
    className,
    header,
    icon,
    title,
    secondaryTitle,
    closable = true,
    children,
    simple,
    variant,
    onClose,
    ...restProps
}) => {
    const classes = classnames(
        className,
        "toast",
        simple && "toast-simple",
        simple && variant && `text-bg-${variant}`,
        "show"
    )
    const body = (
        <div className="toast-body">
            {children}
        </div>
    )
    const closeBtn = closable ? <CloseBtn onClick={onClose} /> : null

    if (simple) {
        return (
            <div className={classes} {...restProps}>
                {body}
                {closeBtn}
            </div>
        )
    }

    const HEADER_CLASS = "toast-header"
    const headerNode = getNullableNode(header)
    const _header = headerNode === false ? (
        <div className={HEADER_CLASS}>
            {
                icon ? (
                    <span className="toast-icon">
                        {icon}
                    </span>
                ) : null
            }
            <strong className="toast-title">
                {title}
            </strong>
            <small className="toast-secondary-title">
                {secondaryTitle}
            </small>
            {closeBtn}
        </div>
    ) : headerNode

    return (
        <div className={classes} {...restProps}>
            {_header}
            {body}
        </div>
    )
}

export default ToastInner