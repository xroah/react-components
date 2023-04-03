import React,
{
    cloneElement,
    FC,
    ReactElement,
    RefObject,
    useState
} from "react"
import { Transition } from "react-transition-group"
import {
    EnterHandler,
    ExitHandler,
    TimeoutProps
} from "react-transition-group/Transition"
import { classnames } from "../utils"
import { isChildrenValidElement } from "../utils/react"

interface FadeProps extends Partial<TimeoutProps<HTMLElement>> {
    fadeClass?: string
    showClass?: string
    showDisplay?: string
    children: ReactElement
}

const Fade: FC<FadeProps> = ({
    fadeClass = "fade",
    showClass = "show",
    children,
    timeout = 150,
    showDisplay,
    nodeRef,
    onEnter,
    onEntering,
    onExit,
    onExited,
    ...restProps
}) => {
    if (!isChildrenValidElement(children)) {
        return null
    }

    const [display, setDisplay] = useState("none")
    const [classes, setClasses] = useState(fadeClass)
    const handleEnter: EnterHandler<HTMLElement> = (...args) => {
        setDisplay(showDisplay ?? "")
        onEnter?.(...args)
    }
    const handleEntering: EnterHandler<HTMLElement> = (...args) => {
        const el = (nodeRef as RefObject<HTMLElement>).current

        //reflow
        el?.offsetHeight
        setClasses(classnames(fadeClass, showClass))
        onEntering?.(...args)
    }
    const handleExit: ExitHandler<HTMLElement> = (...args) => {
        setClasses(fadeClass)
        onExit?.(...args)
    }
    const handleExited: ExitHandler<HTMLElement> = (...args) => {
        setDisplay("none")
        onExited?.(...args)
    }

    return (
        <Transition
            timeout={timeout}
            onEnter={handleEnter}
            onEntering={handleEntering}
            onExit={handleExit}
            onExited={handleExited}
            {...restProps}>
            {
                cloneElement(
                    children,
                    {
                        className: classnames(
                            children.props.className,
                            classes
                        ),
                        style: {
                            ...children.props.style,
                            display
                        }
                    }
                )
            }
        </Transition>
    )
}

export default Fade