
import * as React from "react"
import {classNames} from "reap-utils/lib"
import {handleFuncProp} from "reap-utils/lib/react"
import CloseBtn from "../Commons/CloseBtn"
import {AutoHideProps, ClosableProps, CloseFuncParam, VisibleProps} from "../Commons/common-types"

type BaseProps = Omit<React.HTMLAttributes<HTMLDivElement>, "title"> &
    ClosableProps & AutoHideProps & VisibleProps

export interface ToastInnerProps extends BaseProps {
    icon?: React.ReactNode
    title?: React.ReactNode
    extra?: React.ReactNode
}

interface RefProps {
    nodeRef?: React.RefObject<HTMLDivElement>
}

export default function ToastInner(
    {
        visible,
        autoHide,
        delay,
        icon,
        title,
        extra,
        closable,
        className,
        children,
        style,
        nodeRef,
        onClose,
        ...restProps
    }: ToastInnerProps & RefProps
) {
    const PREFIX = "toast"
    const classes = classNames(
        className,
        PREFIX
    )
    const handleClose = (type?: CloseFuncParam) => {
        handleFuncProp(onClose)(type)
    }
    let header = icon || title || closable ? (
        <div className={`${PREFIX}-header`}>
            {icon}
            <strong className="me-auto">{title}</strong>
            {extra && <small>{extra}</small>}
            {closable && <CloseBtn onClose={handleClose} />}
        </div>
    ) : null
    let timer: number | null = null
    const clearTimer = () => {
        if (timer !== null) {
            clearTimeout(timer)

            timer = null
        }
    }

    React.useEffect(
        () => {
            if (autoHide) {
                timer = window.setTimeout(
                    () => {
                        handleClose("auto")

                        timer = null
                    },
                    delay
                )
            }

            return clearTimer
        },
        [visible]
    )

    return (
        <div
            className={classes}
            ref={nodeRef}
            style={{
                display: "block",
                ...style
            }}
            {...restProps}>
            {header}
            <div className={`${PREFIX}-body`}>{children}</div>
        </div>
    )
}

ToastInner.defaultProps = {
    closable: true,
    autoHide: true,
    delay: 5000
}