import React,
{
    cloneElement,
    FunctionComponent,
    isValidElement,
    ReactElement
} from "react";
import { isFragment } from "react-is"
import { Transition } from "react-transition-group";
import {
    TimeoutProps,
    TransitionStatus
} from "react-transition-group/Transition";
import { classnames } from "../../commons/utils";

interface FadeProps extends Partial<TimeoutProps<HTMLElement>> {
    fadeClass?: string
    showClass?: string
    children: ReactElement
}

const Fade: FunctionComponent<FadeProps> = ({
    fadeClass = "fade",
    showClass = "show",
    children,
    timeout = 150,
    ...restProps
}) => {
    if (!isValidElement(children)) {
        throw new TypeError("The children must be React element")
    }

    if (isFragment(children)) {
        throw TypeError("The children can not be fragment")
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

        return cloneElement(children, { className: classes })
    }

    return (
        <Transition timeout={timeout} {...restProps}>
            {render}
        </Transition>
    )
}

export default Fade