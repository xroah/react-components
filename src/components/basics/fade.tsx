import React,
{
    cloneElement,
    FC,
    ReactElement
} from "react"
import { Transition } from "react-transition-group"
import {
    TimeoutProps,
    TransitionStatus
} from "react-transition-group/Transition"
import { classnames } from "../utils"
import { isChildrenValidElement } from "../utils/react"

interface FadeProps extends Partial<TimeoutProps<HTMLElement>> {
    fadeClass?: string
    showClass?: string
    children: ReactElement
}

const Fade: FC<FadeProps> = ({
    fadeClass = "fade",
    showClass = "show",
    children,
    timeout = 150,
    ...restProps
}) => {
    if (!isChildrenValidElement(children)) {
        return null
    }

    const render = (s: TransitionStatus) => {
        const c = children as ReactElement
        const childrenClass = c.props.className
        const show = s === "entering" || s === "entered"
        const classes = classnames(
            childrenClass,
            fadeClass,
            show && showClass
        )

        return cloneElement(c, { className: classes })
    }

    return (
        <Transition timeout={timeout} {...restProps}>
            {render}
        </Transition>
    )
}

export default Fade