import React, { CSSProperties } from "react"
import { Transition, TransitionStatus } from "react-transition-group"
import Alert, { AlertProps } from "../basics/alert"
import { ToggleEvents } from "../commons/types"
import { number } from "prop-types"
import { omit } from "../utils"
import Timer from "r-layers/utils/timer"

const DEFAULT_DURATION = 3000
export const WRAPPER_CLASS = "r-message-wrapper"

export interface MessageProps extends AlertProps, ToggleEvents {
    duration?: number
    visible?: boolean
}

class Message extends React.Component<MessageProps> {
    private timer: Timer
    private ref = React.createRef<HTMLDivElement>()

    static propTypes = {
        duration: number
    }

    constructor(props: MessageProps) {
        super(props)

        this.timer = new Timer(0, this.close)
    }

    close = () => {
        this.timer.clear()
        this.props.onClose?.()
    }

    delayClose() {
        const { duration = DEFAULT_DURATION } = this.props

        if (duration > 0) {
            this.timer.timeout = duration

            this.timer.delay(true)
        }
    }

    override componentDidMount() {
        this.delayClose()
    }

    override componentDidUpdate(prevProps: Readonly<MessageProps>) {
        const { duration } = this.props

        if (prevProps.duration !== duration) {
            this.timer.clear()
            this.delayClose()
        }
    }

    override componentWillUnmount() {
        this.timer.clear()
    }

    render() {
        const {
            onShow,
            onShown,
            onHide,
            onHidden,
            visible,
            ...restProps
        } = this.props
        const defaultStyle: CSSProperties = {
            transform: "translateY(-150px)",
            opacity: 0
        }
        const render = (s: TransitionStatus) => {
            const show = s === "entering" || s === "entered"
            const style: CSSProperties = {}

            if (show) {
                style.transform = "none"
                style.opacity = 1
                style.height = this.ref.current?.scrollHeight
            } else if (s === "exiting") {
                style.height = 0
                style.opacity = 0
            }

            return (
                <div
                    ref={this.ref}
                    style={{
                        ...defaultStyle,
                        ...style
                    }}
                    className="r-message-item">
                    <Alert onClose={this.close} {...restProps} />
                </div>
            )
        }

        omit(restProps, ["duration", "onClose"])

        return (
            <Transition
                nodeRef={this.ref}
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
}

export default Message