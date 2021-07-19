import * as React from "react"
import Transition from "./Transition"
import PropTypes from "prop-types"
import {FadeProps} from "./interface"
import {
    ENTERED,
    ENTERING,
    EXITED
} from "./constants"

export default function Fade(props: FadeProps) {
    const {
        transitionClass,
        activeClass,
        children,
        hiddenOnExited,
        ...otherProps
    } = props

    return (
        <Transition {...otherProps}>
            {
                state => {
                    const child = React.Children.only(children) as React.ReactElement
                    let style = {...child.props.style}
                    let className = [child.props.className, transitionClass]

                    if (state === ENTERING || state === ENTERED) {
                        className.push(activeClass)
                    } else if (state === EXITED && hiddenOnExited) {
                        style.display = "none"
                    }

                    return React.cloneElement(
                        child,
                        {
                            className: className.join(" "),
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
    hiddenOnExited: true
}

Fade.propTypes = {
    hiddenOnExited: PropTypes.bool,
    transitionClass: PropTypes.string,
    activeClass: PropTypes.string
}