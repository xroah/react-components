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
import classNames from "../../class-names"

export default function Fade(
    {
        showClass,
        children,
        name,
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
                    let className = [child.props.className, name]

                    if (state === ENTERING || state === ENTERED) {
                        className.push(showClass)
                    } else if (state === EXITED && hiddenOnExited) {
                        style.display = "none"
                    }

                    return React.cloneElement(
                        child,
                        {
                            className: classNames(className),
                            style
                        }
                    )
                }
            }
        </Transition>
    )
}

Fade.defaultProps = {
    showClass: "show",
    name: "fade",
    hiddenOnExited: true
}

Fade.propTypes = {
    hiddenOnExited: bool,
    name: string,
    showClass: string
}