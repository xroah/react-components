import * as React from "react"
import Transition from "./Transition"
import {FadeProps} from "./interface"
import {
    ENTERED,
    ENTERING,
    EXITED
} from "./constants"
import {bool, string} from "prop-types"

export default function Fade(props: FadeProps) {
    const {
        transitionClass,
        activeClass,
        children,
        hiddenOnExited,
        ...restProps
    } = props

    return (
        <Transition {...restProps}>
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
    timeout: 300,
    activeClass: "show",
    transitionClass: "fade",
    hiddenOnExited: true
}

Fade.propTypes = {
    hiddenOnExited: bool,
    transitionClass: string,
    activeClass: string
}