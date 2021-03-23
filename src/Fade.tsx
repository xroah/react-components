import * as React from "react"
import Transition,
{
    ENTERED,
    ENTERING,
    EXITED,
    TransitionProps
} from "./Transition"
import classNames from "reap-utils/lib/class-names"
import PropTypes from "prop-types"

export interface FadeProps extends TransitionProps {
    invisibleOnExit?: Boolean
    transitionClass?: string
    activeClass?: string
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
        transitionClass,
        activeClass
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
                    let classes = classNames(
                        child.props.className,
                        transitionClass
                    )

                    if (state === EXITED && invisibleOnExit) {
                        style.display = "none"
                    }

                    if (state === ENTERING || state === ENTERED) {
                        classes = classNames(classes, activeClass)
                    }
                    
                    return React.cloneElement(
                        child,
                        {
                            className: classes,
                            style
                        }
                    )
                }
            }
        </Transition>
    )
}

Fade.defaultProps = {
    timeout: 150,
    activeClass: "show",
    transitionClass: "fade",
    invisibleOnExit: true
}

Fade.propTypes = {
    invisibleOnExit: PropTypes.bool,
    transitionClass: PropTypes.string,
    activeClass: PropTypes.string
}