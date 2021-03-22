import * as React from "react"
import Transition,
{
    ENTERED,
    ENTERING,
    EXITED,
    TransitionProps
} from "./Transition"
import classNames from "reap-utils/lib/class-names"

export interface FadeProps extends TransitionProps {
    invisibleOnExit?: Boolean
}

export default function Fade(props: FadeProps) {
    const {
        children,
        timeout,
        in: _in,
        unmountOnExit,
        invisibleOnExit,
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
        <Transition {...transitionProps}>
            {
                state => {
                    const child = React.Children.only(children) as React.ReactElement
                    const {style = {}} = child.props
                    let display = style.display || ""
                    let classes = classNames(
                        child.props.className,
                        "fade"
                    )

                    if (state === EXITED && invisibleOnExit) {
                        display = "none"
                    }

                    if (state === ENTERING || state === ENTERED) {
                        classes = classNames(classes, "show")
                    }

                    return React.cloneElement(
                        child,
                        {
                            className: classes,
                            ...otherProps,
                            style: {
                                ...style,
                                display
                            }
                        }
                    )
                }
            }
        </Transition>
    )
}

Fade.defaultProps = {
    timeout: 150
}