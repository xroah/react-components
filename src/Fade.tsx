import * as React from "react"
import Transition from "./Transition"
import classNames from "reap-utils/lib/class-names"
import PropTypes from "prop-types"
import {FadeProps} from "./interface"
import {ENTERED, ENTERING} from "./constants"

export default function Fade(props: FadeProps) {
    const {
        transitionClass,
        activeClass,
        children,
        ...otherProps
    } = props

    return (
        <Transition {...otherProps}>
            {
                state => {
                    const child = React.Children.only(children) as React.ReactElement
                    let className = classNames(
                        child.props.className,
                        transitionClass
                    )

                    if (state === ENTERING || state === ENTERED) {
                        className = classNames(className, activeClass)
                    }

                    return React.cloneElement(child, {className})
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