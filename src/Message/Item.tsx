import * as React from "react"
import {classNames} from "reap-utils/lib"
import {handleFuncProp, Transition} from "reap-utils/lib/react"
import CloseBtn from "../Commons/CloseBtn"
import {
    AutoHideProps,
    ClosableProps,
    Events,
    ValueOf,
    VisibleProps
} from "../Commons/common-types"

const variants = [
    "success",
    "danger",
    "warning",
    "info"
] as const

export type Variant = ValueOf<typeof variants>

type BaseProps = React.HTMLAttributes<HTMLDivElement> &
    Events & ClosableProps & AutoHideProps

export interface MessageItemProps extends BaseProps {
    variant?: Variant
}

export default function MessageItem(
    {
        className,
        closable,
        variant = "info",
        autoHide = true,
        delay = 3000,
        style = {},
        children,
        visible,
        onShow,
        onShown,
        onHidden,
        onHide,
        onClose,
        ...restProps
    }: MessageItemProps & VisibleProps
) {
    let timer: number | null = null
    const PREFIX = "alert"
    const classes = classNames(
        className,
        PREFIX,
        `${PREFIX}-${variant}`
    )
    const clear = () => {
        if (timer !== null) {
            window.clearTimeout(timer)

            timer = null
        }
    }

    React.useEffect(
        () => {
            if (autoHide) {
                timer = window.setTimeout(
                    () => handleFuncProp(onClose)(),
                    delay
                )
            }

            return clear
        },
        [visible]
    )

    return (
        <Transition
            unmountOnExit
            appear
            in={!!visible}
            onEnter={onShow}
            onEntered={onShown}
            onExit={onHide}
            onExited={onHidden}>
            {
                status => {
                    const newStyle = {
                        marginTop: "1rem",
                        marginBottom: 0,
                        padding: ".5rem",
                        ...style,
                        transition: "opacity .3s, margin .3s",
                        transform: "translateY(-110%)",
                        opacity: 0
                    }

                    if (
                        status === "entering" ||
                        status === "entered"
                    ) {
                        newStyle.transform = "none"
                        newStyle.opacity = .9
                    } else {
                        newStyle.marginTop = "-3rem"
                    }

                    return (
                        <div
                            style={newStyle}
                            className={classes}
                            {...restProps}>
                            {children}
                            {closable && <CloseBtn onClick={onClose} />}
                        </div>
                    )
                }
            }
        </Transition>
    )
}