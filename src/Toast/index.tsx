import * as React from "react"
import {classNames} from "reap-utils/lib"
import {
    Fade,
    handleFuncProp,
    NoTransition
} from "reap-utils/lib/react"
import CloseBtn from "../Commons/CloseBtn"
import {Cb, Events} from "../Commons/common-types"

type BaseProps = Omit<React.HTMLAttributes<HTMLDivElement>, "title">

export interface ToastProps extends BaseProps, Events {
    visible?: boolean
    icon?: React.ReactNode
    title?: React.ReactNode
    extra?: React.ReactNode
    showClose?: boolean
    fade?: boolean
    autoHide?: boolean
    delay?: number
    unmountOnExit?: boolean
    onClose?: Cb
}

export default function Toast(
    {
        visible,
        icon,
        title,
        extra,
        showClose,
        className,
        fade,
        children,
        style,
        autoHide,
        delay,
        unmountOnExit,
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
        onEnter: () => handleFuncProp(onShow)(),
        onEntered: () => handleFuncProp(onShown)(),
        onExit: () => handleFuncProp(onHide)(),
        onExited: () => handleFuncProp(onHidden)()
    }
    let header = icon || title || showClose ? (
        <div className={`${PREFIX}-header`}>
            {icon}
            <strong className="me-auto">{title}</strong>
            {extra && <small>{extra}</small>}
            {showClose && <CloseBtn onClick={handleCloseClick} />}
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

    return fade ?
        <Fade {...fadeProps}>{child}</Fade> :
        <NoTransition {...fadeProps}>{child}</NoTransition>
}

Toast.defaultProps = {
    showClose: true,
    fade: true,
    autoHide: true,
    delay: 5000
}