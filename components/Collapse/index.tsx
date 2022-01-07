import * as React from "react"
import {bool, func} from "prop-types"
import classNames from "reap-utils/lib/class-names"
import {only, Transition} from "reap-utils/lib/react"
import {DivAttrs} from "../Commons/consts-and-types"
import {capitalize, chainFunction} from "reap-utils/lib"

type Callback = (node?: HTMLElement) => void

export interface CollapseProps extends DivAttrs {
    children: React.ReactElement
    open?: boolean
    horizontal?: boolean
    onShow?: Callback
    onShown?: Callback
    onHide?: Callback
    onHidden?: Callback
}

type ScrollSize = "scrollWidth" | "scrollHeight"

const Collapse: React.FunctionComponent<CollapseProps> = (
    {
        className,
        open,
        children,
        horizontal,
        onShow,
        onShown,
        onHide,
        onHidden,
        ...restProps
    }
) => {
    if (!children) {
        return null
    }

    let c: React.ReactElement = only(children)
    const PREFIX = "collapse"
    const hCls = horizontal ? `${PREFIX}-horizontal` : ""
    const classes = classNames(
        className,
        PREFIX,
        hCls
    )
    const showClass = classNames(classes, "show")
    const collapsingClass = classNames(
        className,
        hCls,
        "collapsing"
    )
    const updateSize = (
        node?: HTMLElement,
        size?: string
    ) => {
        const dimension = horizontal ? "width" : "height"
        const sizeProp = `scroll${capitalize(dimension)}` as ScrollSize
        
        if (node) {
            if (size !== undefined) {
                node.style[dimension] = size
            } else {
                /**
                 * The real height/width may be not a integer
                 * like 108.55 and the scrollHeight/scrollWidth would be 109,
                 * and may be show a line(about 1px)  
                 */
                const size = node[sizeProp] - 1
                node.style[dimension] = `${size}px`
            }
        }
    }
    const handleEnter = React.useCallback(
        chainFunction(
            updateSize,
            onShow
        ),
        [onShow]
    )
    const handleEntered = React.useCallback(
        chainFunction(
            (node?: HTMLElement) => updateSize(node, ""),
            onShown
        ),
        [onShown]
    )
    const handleExiting = (node?: HTMLElement) => {
        updateSize(node, "")
    }
    const handleExit = React.useCallback(
        chainFunction(
            updateSize,
            onHide
        ),
        [onHide]
    )

    return (
        <Transition
            in={!!open}
            onEnter={handleEnter}
            onEntered={handleEntered}
            onExit={handleExit}
            onExiting={handleExiting}
            onExited={onHidden}>
            {
                state => {
                    let cls

                    switch (state) {
                        case "enter":
                        case "entering":
                        case "exiting":
                            cls = collapsingClass
                            break
                        case "entered":
                        case "exit":
                            cls = showClass
                            break
                        default:
                            cls = classes
                    }

                    return React.cloneElement(
                        c,
                        {
                            className: classNames(
                                c.props.className,
                                cls
                            ),
                            ...restProps
                        }
                    )
                }
            }
        </Transition>
    )
}

Collapse.propTypes = {
    open: bool,
    onShow: func,
    onShown: func,
    onHide: func,
    onHidden: func
}

export default Collapse