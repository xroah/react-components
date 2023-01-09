import React,
{
    cloneElement,
    FunctionComponent,
    isValidElement,
    ReactElement
} from "react";
import { isFragment } from "react-is"
import classNames from "classnames";
import { Transition } from "react-transition-group";
import { TimeoutProps } from "react-transition-group/Transition";

interface FadeProps extends Partial<TimeoutProps<HTMLElement>> {
    fadeClass?: string
    children: ReactElement
}

const Fade: FunctionComponent<FadeProps> = ({
    fadeClass = "fade",
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

    return (
        <Transition
            timeout={timeout}
            {...restProps}>
            {
                s => {
                    const c = children as ReactElement
                    const childrenClass = c.props.className
                    const show = s === "entering" || s === "entered"
                    const classes = classNames(
                        childrenClass,
                        fadeClass,
                        show && "show"
                    )

                    return cloneElement(
                        children,
                        { className: classes }
                    )
                }
            }
        </Transition>
    )
}

export default Fade