import * as React from "react"
import CSSTransition, {CSSTransitionProps} from "./CSSTransition"
import classNames from "reap-utils/lib/class-names"

export default function Fade(props: CSSTransitionProps) {
    const {
        children,
        timeout,
        in: _in,
        unmountOnExit,
        appear,
        onEnter,
        onEntering,
        onEntered,
        onExit,
        onExiting,
        onExited,
        ...otherProps
    } = props
    const transitionProps = {
        timeout,
        in: _in,
        unmountOnExit,
        appear,
        onEnter,
        onEntering,
        onEntered,
        onExit,
        onExiting,
        onExited
    }

    return (
        <CSSTransition {...transitionProps}>
            {
                state => {
                    const child = React.Children.only(children) as React.ReactElement
                    let classes = classNames(
                        child.props.className,
                        "fade"
                    )
                    const enterSet = new Set(["enter", "entering", "entered"])

                    if (enterSet.has(state)) {
                        if (state !== "enter") {
                            classes = classNames(classes, "show")
                        }
                    }

                    return React.cloneElement(
                        child,
                        {
                            className: classes,
                            ...otherProps
                        }
                    )
                }
            }
        </CSSTransition>
    )
}

Fade.defaultProps = {
    timeout: 150
}