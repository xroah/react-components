import React,
{
    cloneElement,
    CSSProperties,
    FC,
    ReactElement,
    RefObject,
    useEffect,
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

const Fade: FC<FadeProps> = (
    {
        fadeClass = "fade",
        showClass = "show",
        children,
        timeout = 150,
        showDisplay,
        nodeRef,
        unmountOnExit,
        onEnter,
        onEntering,
        onExit,
        onExited,
        ...restProps
    }: FadeProps
) => {
    if (!isChildrenValidElement(children)) {
        return null
    }
    
    const [
        display,
        setDisplay
    ] = useState(unmountOnExit ? "" : "none")
    const style: CSSProperties = {
        ...children.props.style
    }
    const [classes, setClasses] = useState(fadeClass)
    const removeDisplay = () => setDisplay(showDisplay ?? "")
    const show = () => setClasses(classnames(fadeClass, showClass))
    const handleEnter: EnterHandler<HTMLElement> = (...args) => {
        if (!unmountOnExit) {
            removeDisplay()
        }

        onEnter?.(...args)
    }
    const handleEntering: EnterHandler<HTMLElement> = (...args) => {
        if (!unmountOnExit) {
            const el = (nodeRef as RefObject<HTMLElement>)?.current

            //reflow
            el?.offsetHeight
        }

        show()
        onEntering?.(...args)
    }
    const handleExit: ExitHandler<HTMLElement> = (...args) => {
        setClasses(fadeClass)
        onExit?.(...args)
    }
    const handleExited: ExitHandler<HTMLElement> = (...args) => {
        if (!unmountOnExit) {
            setDisplay("none")
        }

        onExited?.(...args)
    }

    if (display) {
        style.display = display
    }

    useEffect(
        () => {
            // mounted, if in is true and appear is false
            // the element may invisible
            if (restProps.in && !restProps.appear) {
                removeDisplay()
                show()
            }
        },
        []
    )

    return (
        <Transition
            timeout={timeout}
            onEnter={handleEnter}
            onEntering={handleEntering}
            onEntered={() => console.log("eee")}
            onExit={handleExit}
            onExited={handleExited}
            unmountOnExit={unmountOnExit}
            {...restProps}>
            {
                cloneElement(
                    children,
                    {
                        className: classnames(
                            children.props.className,
                            classes
                        ),
                        style
                    }
                )
            }
        </Transition>
    )
}

export default Fade