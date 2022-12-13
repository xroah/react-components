import classNames from "classnames";
import React, { FunctionComponent } from "react"
import { Transition } from "react-transition-group"
import Alert, { AlertProps } from "../alert";
import { ToggleEvents } from "../commons/types";

const DEFAULT_DURATION = 3000

export interface MessageProps extends AlertProps, ToggleEvents {
    duration?: number
}

interface UnmountProps {
    visible: boolean
    container: HTMLElement
}


type Props = MessageProps & UnmountProps

class Message extends React.Component<Props> {
    private timer = -1

    constructor(props: Props) {
        super(props)
    }

    clearTimeout() {
        if (this.timer !== -1) {
            window.clearTimeout(this.timer)

            this.timer = -1
        }
    }

    close = () => {
        this.clearTimeout()
        this.props.onClose?.()
    }

    componentDidMount() {
        const { duration = DEFAULT_DURATION } = this.props

        if (duration! > 0) {
            this.timer = window.setTimeout(
                this.close,
                duration
            )
        }
    }

    componentWillUnmount() {
        const {container} = this.props

        this.clearTimeout()
        container.remove()
    }

    render() {
        const {
            onShow,
            onShown,
            className,
            onHide,
            onHidden,
            visible,
            ...restProps
        } = this.props

        delete restProps.duration
        delete restProps.onClose

        return (
            <Transition
                in={visible}
                timeout={150}
                onEnter={onShow}
                onEntered={onShown}
                onExit={onHide}
                onExited={onHidden}
                appear
                unmountOnExit>
                {
                    state => {
                        const isEnter = (
                            state === "entering" ||
                            state === "entered"
                        )
                        const classes = classNames(
                            className,
                            "r-message-item",
                            isEnter && "show"
                        )

                        return (
                            <div className={classes}>
                                <Alert
                                    onClose={this.close}
                                    {...restProps} />
                            </div>
                        )
                    }
                }
            </Transition>
        )
    }
}

export default Message