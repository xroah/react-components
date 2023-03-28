import React, {
    CSSProperties,
    FC,
    useEffect,
    useRef
} from "react"
import { Transition, TransitionStatus } from "react-transition-group"
import Alert from "../basics/alert"
import { number } from "prop-types"
import Timer from "r-layers/utils/timer"
import { MessageProps } from "./types"

const DEFAULT_DURATION = 3000
export const WRAPPER_CLASS = "r-message"

const Message: FC<MessageProps> = (
    {
        onShow,
        onShown,
        onHide,
        onHidden,
        onClose,
        onMouseLeave,
        onMouseEnter,
        visible,
        duration = DEFAULT_DURATION,
        ...restProps
    }
) => {
    const defaultStyle: CSSProperties = {
        transform: "translateY(-150px)",
        opacity: 0
    }
    const timer = useRef(new Timer(duration))
    const nodeRef = useRef<HTMLDivElement>(null)

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        timer.current.clear()
        onMouseEnter?.(e)
    }
    const handleMouseLeave = React.useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (duration > 0) {
                timer.current.delay(true)
            }

            onMouseLeave?.(e)
        },
        [duration, onMouseLeave]
    )
    const render = (s: TransitionStatus) => {
        const show = s === "entering" || s === "entered"
        const style: CSSProperties = {}

        if (show) {
            style.transform = "none"
            style.opacity = 1
            style.height = nodeRef.current?.scrollHeight
        } else if (s === "exiting") {
            style.height = 0
        }

        return (
            <div
                ref={nodeRef}
                style={{
                    ...defaultStyle,
                    ...style
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="r-message-item">
                <Alert onClose={onClose} {...restProps} />
            </div>
        )
    }
    timer.current.callback = onClose

    useEffect(
        () => {
            const t = timer.current

            t.clear()

            if (duration > 0) {
                t.delay(true)
            }

            return () => timer.current.clear()
        },
        [duration]
    )

    return (
        <Transition
            nodeRef={nodeRef}
            in={visible}
            timeout={200}
            onEnter={onShow}
            onEntered={onShown}
            onExit={onHide}
            onExited={onHidden}
            appear
            unmountOnExit>
            {render}
        </Transition>
    )
}
Message.propTypes = {
    duration: number
}

export default Message