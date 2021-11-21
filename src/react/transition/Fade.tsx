import * as React from "react"
import Transition from "./Transition"
import {FadeProps} from "./interface"
import {
    ENTERED,
    ENTERING,
    EXITED
} from "./constants"
import {bool, string} from "prop-types"
import {only} from "../main"

export default function Fade(
    {
        transitionClass,
        activeClass,
        children,
        hiddenOnExited,
        ...restProps
    }: FadeProps
) {

    return (
        <Transition {...restProps}>
            {
                state => {
                    const child = only(children as React.ReactElement)
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