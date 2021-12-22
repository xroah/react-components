import * as React from "react"
import {omit} from "reap-utils/lib"
import classNames from "reap-utils/lib/class-names"
import {Fade, getFunction, NoTransition} from "reap-utils/lib/react"
import {FadeProps} from "reap-utils/lib/react/transition/interface"
import {PaneProps} from "./types"

const Pane: React.FunctionComponent<PaneProps> = (
    {
        className,
        style = {},
        children,
        __anim__,
        __key__,
        __active__,
        onShow,
        onShown,
        onHide,
        onHidden,
        ...restProps
    }
) => {
    style.display = "block"
    const getFunc = (fn?: Function) =>
        () => getFunction(fn)(__key__)
    const classes = classNames(
        className,
        "tab-pane",
        __active__ && "active"
    )
    const ref = React.useRef(null)
    const child = (
        // @ts-ignore: Types of property 'title' are incompatible
        <div
            className={classes}
            style={style}
            {...omit(restProps, ["disabled", "title"])}>
            {children}
        </div>
    )
    const transitionProps: FadeProps = {
        in: !!__active__,
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