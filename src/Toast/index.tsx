import * as React from "react"
import {classNames} from "reap-utils/lib"
import {
    Fade,
    handleFuncProp,
    NoTransition
} from "reap-utils/lib/react"
import CloseBtn from "../Commons/CloseBtn"
import {
    AutoHideProps,
    ClosableProps,
    CommonTransitionProps,
    Events
} from "../Commons/common-types"

type BaseProps = Omit<React.HTMLAttributes<HTMLDivElement>, "title"> &
    CommonTransitionProps & Events & ClosableProps & AutoHideProps
export interface ToastProps extends BaseProps {
    icon?: React.ReactNode
    title?: React.ReactNode
    extra?: React.ReactNode
    fade?: boolean
    // for Notification only
    __noAnim__?: boolean
}

export default function Toast(
    {
        visible,
        icon,
        title,
        extra,
        closable,
        className,
        fade,
        children,
        style,
        autoHide,
        delay,
        unmountOnExit,
        hideOnExit,
        __noAnim__,
        onShow,
        onShown,
        onHidden,
        onHide,
        onClose,
        ...restProps
    }: ToastProps
) {
    const PREFIX = "toast"
    const classes = classNames(
        className,
        PREFIX
    )
    const handleCloseClick = () => {
        handleFuncProp(onClose)()
    }
    const fadeProps = {
        in: !!visible,
        appear: true,
        unmountOnExit,
        hideOnExit,
        onEnter: () => handleFuncProp(onShow)(),
        onEntered: () => handleFuncProp(onShown)(),
        onExit: () => handleFuncProp(onHide)(),
        onExited: () => handleFuncProp(onHidden)()
    }
    let header = icon || title || closable ? (
        <div className={`${PREFIX}-header`}>
            {icon}
            <strong className="me-auto">{title}</strong>
            {extra && <small>{extra}</small>}
            {closable && <CloseBtn onClick={handleCloseClick} />}
        </div>
    ) : null
    const child = (
        <div
            className={classes}
            style={{
                ...style,
                display: "block"
            }}
            {...restProps}>
            {header}
            <div className={`${PREFIX}-body`}>{children}</div>
        </div>
    )
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
                        handleFuncProp(onClose)()

                        timer = null
                    },
                    delay
                )
            }

            return clearTimer
        },
        [visible]
    )

    if (__noAnim__) {
        return child
    }

    return fade ?
        <Fade {...fadeProps}>{child}</Fade> :
        <NoTransition {...fadeProps}>{child}</NoTransition>
}

Toast.defaultProps = {
    closable: true,
    fade: true,
    autoHide: true,
    delay: 5000
}