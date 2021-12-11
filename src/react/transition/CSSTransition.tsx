import * as React from "react"
import {CSSTransitionProps} from "./interface";
import Transition from "./Transition";
import {
    ENTER,
    ENTERING,
    EXIT,
    EXITED,
    EXITING
} from "./constants";
import {bool, string} from "prop-types"
import {only} from "../main";

export default function CSSTransition(props: CSSTransitionProps) {
    const {
        name,
        children,
        hideOnExit,
        ...restProps
    } = props

    return (
        <Transition {...restProps}>
            {
                state => {
                    const child = only(children as React.ReactElement) 
                    let style = {...child.props.style}
                    let className = [child.props.className]

                    switch (state) {
                        case ENTER:
                            className.push(`${name}-enter`)
                            break
                        case ENTERING:
                            className.push(`${name}-enter-active`)
                            break
                        case EXIT:
                            className.push(`${name}-exit`)
                            break
                        case EXITING:
                            className.push(`${name}-exit-active`)
                            break
                        case EXITED:
                            if (hideOnExit) {
                                style.display = "none"
                            }
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

CSSTransition.propTypes = {
    name: string.isRequired,
    hideOnExit: bool
}

CSSTransition.defaultProps = {
    hideOnExit: true
}