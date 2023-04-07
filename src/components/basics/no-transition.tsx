import React, {
    cloneElement,
    FC,
    ReactElement,
    useEffect,
    useState
} from "react"
import { TimeoutProps } from "react-transition-group/Transition"
import { classnames } from "../utils"

type BaseProps = Partial<TimeoutProps<HTMLElement>>

interface NoTransitionProps extends BaseProps {
    children: React.ReactNode
    showClass?: string
    showDisplay?: string
}

const NoTransition: FC<NoTransitionProps> = (
    {
        onEnter,
        onEntering,
        onEntered,
        onExit,
        onExiting,
        onExited,
        in: _in,
        children,
        unmountOnExit,
        showClass = "show",
        showDisplay,
    }: NoTransitionProps
) => {
    const [didMount, setDidMount] = useState(false)

    useEffect(
        () => setDidMount(true),
        []
    )
    useEffect(
        () => {
            if (!didMount) {
                return
            }

            if (_in) {
                onEnter?.(false)
                onEntering?.(false)
                onEntered?.(false)
            } else {
                onExit?.()
                onExiting?.()
                onExited?.()
            }
        },
        [_in]
    )

    if (!_in && unmountOnExit) {
        return null
    }

    const c = children as ReactElement
    const classes = classnames(
        c.props.className,
        _in && showClass
    )

    return cloneElement(
        c,
        {
            className: classes,
            style: {
                ...c.props.style,
                display: _in ? showDisplay : "none"
            }
        }
    )
}

export default NoTransition