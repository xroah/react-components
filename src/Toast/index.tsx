import * as React from "react"
import {Fade, NoTransition} from "reap-utils/lib/react"
import {
    AutoHideProps,
    CommonTransitionProps,
    Events,
} from "../Commons/common-types"
import ToastInner, {ToastInnerProps} from "./Inner"

type BaseProps = CommonTransitionProps & Events & AutoHideProps
export interface ToastProps extends BaseProps, ToastInnerProps {
    fade?: boolean
}

export default function Toast(
    {
        visible,
        icon,
        title,
        extra,
        closable,
        fade,
        children,
        unmountOnExit,
        hideOnExit,
        onShow,
        onShown,
        onHidden,
        onHide,
        onClose,
        ...restProps
    }: ToastProps
) {
    const ref = React.useRef<HTMLDivElement>(null)
    const fadeProps = {
        in: !!visible,
        appear: true,
        unmountOnExit,
        hideOnExit,
        nodeRef: ref,
        onEnter: onShow,
        onEntered: onShown,
        onExit: onHide,
        onExited: onHidden
    }
    const child = (
        <ToastInner
            visible={visible}
            icon={icon}
            title={title}
            extra={extra}
            closable={closable}
            nodeRef={ref}
            onClose={onClose}
            {...restProps} />
    )

    return fade ?
        <Fade {...fadeProps}>{child}</Fade> :
        <NoTransition {...fadeProps}>{child}</NoTransition>
}

Toast.defaultProps = {
    fade: true
}