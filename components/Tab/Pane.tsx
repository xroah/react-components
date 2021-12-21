import * as React from "react"
import classNames from "reap-utils/lib/class-names"
import {Fade, NoTransition} from "reap-utils/lib/react"
import {FadeProps} from "reap-utils/lib/react/transition/interface"
import {DivAttrs} from "../Commons/consts-and-types"
import {Internal} from "./types"

type Base = Omit<DivAttrs, "title">

interface PaneProps extends Base, Internal {
    title?: React.ReactNode
    disabled?: boolean
    // for internal only
    __anim__?: boolean
}

const Pane: React.FunctionComponent<PaneProps> = (
    {
        // @ts-ignore: unused
        title,
        className,
        style = {},
        children,
        __key__,
        __anim__,
        __active_key__,
        ...restProps
    }
) => {
    style.display = "block"
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
        nodeRef: ref
    }

    return __anim__ ?
        <Fade {...transitionProps} /> :
        <NoTransition {...transitionProps} />
}

export default Pane