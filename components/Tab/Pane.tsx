import * as React from "react"
import classNames from "reap-utils/lib/class-names"
import {Fade, NoTransition} from "reap-utils/lib/react"
import {FadeProps} from "reap-utils/lib/react/transition/interface"
import {DivAttrs} from "../Commons/consts-and-types"

let uid = 0

type Base = Omit<DivAttrs, "title">

interface PaneProps extends Base {
    title?: React.ReactNode
    // for internal only
    __key__?: React.Key
    __anim__?: boolean
    __active_key__?: React.Key
}

const Pane: React.FunctionComponent<PaneProps> = (
    {
        // @ts-ignore: unused
        title,
        className,
        style = {},
        children,
        __key__ = String(uid++),
        __anim__,
        __active_key__,
        ...restProps
    }
) => {
    style.display = "block"
    const classes = classNames(className, "tab-pane")
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
        hideOnExit: true
    }

    return __anim__ ?
        <Fade {...transitionProps} /> :
        <NoTransition {...transitionProps} />
}

export default Pane