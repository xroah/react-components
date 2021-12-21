import * as React from "react"
import classNames from "reap-utils/lib/class-names"
import {Fade, getFunction, NoTransition} from "reap-utils/lib/react"
import {FadeProps} from "reap-utils/lib/react/transition/interface"
import {DivAttrs} from "../Commons/consts-and-types"
import {Internal} from "./types"

type Base = Omit<DivAttrs, "title">

type Callback = (k?: string) => void

interface PaneProps extends Base, Internal {
    title?: React.ReactNode // for Title component
    disabled?: boolean
    onShow?: Callback
    onShown?: Callback
    onHide?: Callback
    onHidden?: Callback
    // for internal only
    __anim__?: boolean
}

const Pane: React.FunctionComponent<PaneProps> = (
    {
        // @ts-ignore: unused
        title,
        className,
        style = {},
        onShow,
        onShown,
        onHide,
        onHidden,
        children,
        __key__,
        __anim__,
        __active_key__,
        ...restProps
    }
) => {
    style.display = "block"
    const getFunc = (fn?: Function) =>
        () => getFunction(fn)(__key__)
    const classes = classNames(className, "tab-pane")
    const ref = React.useRef(null)
    const child = (
        <div
            className={classes}
            style={style}
            {...restProps}>
            {children}
        </div>
    )
    const transitionProps: FadeProps = {
        in: __active_key__ === __key__,
        children: child,
        hideOnExit: true,
        nodeRef: ref,
        onEnter: getFunc(onShow),
        onEntered: getFunc(onShown),
        onExit: getFunc(onHide),
        onExited: getFunc(onHidden)
    }

    return __anim__ ?
        <Fade {...transitionProps} /> :
        <NoTransition {...transitionProps} />
}

export default Pane