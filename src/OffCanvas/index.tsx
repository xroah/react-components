import * as React from "react"
import {classNames, omit} from "reap-utils/lib"
import {handleFuncProp, Transition} from "reap-utils/lib/react"
import {Events, ValueOf} from "../Commons/common-types"
import Backdrop from "../Commons/backdrop"

const placements = [
    "start",
    "end",
    "top",
    "bottom"
] as const

type BaseProps = React.HTMLAttributes<HTMLDivElement> & Events
type CloseFuncParam = "btn" | "esc" | "backdrop"

interface OffCanvasProps extends Omit<BaseProps, "title"> {
    keyboard?: boolean
    scroll?: boolean
    backdrop?: boolean
    placement?: ValueOf<typeof placements>
    visible?: boolean
    showClose?: boolean
    title?: React.ReactNode
    onClose?: (type: CloseFuncParam) => void
}

interface State {
    visibility: "visible" | "hidden"
}

export default class OffCanvas extends React.Component<OffCanvasProps, State> {
    static defaultProps: OffCanvasProps = {
        placement: "start",
        keyboard: true,
        backdrop: true,
        showClose: true
    }

    constructor(props: OffCanvasProps) {
        super(props)

        this.state = {
            visibility: props.visible ? "visible" : "hidden"
        }
    }

    componentDidUpdate(prevProps: OffCanvasProps) {
        const {visible, keyboard} = this.props

        if (prevProps.visible !== visible) {
            if (visible) {
                if (keyboard) {
                    this.addEvent()
                }
            } else {
                this.removeEvent()
            }
        }
    }

    componentWillUnmount() {
        this.removeEvent()
    }

    addEvent() {
        document.addEventListener("keydown", this.handleKeyDown)
    }

    removeEvent() {
        document.removeEventListener("keydown", this.handleKeyDown)
    }

    onClose(type: CloseFuncParam) {
        const {onClose} = this.props

        if (onClose) {
            onClose(type)
        }
    }

    handleClose = () => {
        this.onClose("btn")
    }

    handleKeyDown = (evt: KeyboardEvent) => {
        if (evt.key.toLowerCase() === "escape") {
            this.onClose("esc")
        }
    }

    handleClickBackdrop = () => {
        this.onClose("backdrop")
    }

    renderHeader(
        title?: React.ReactNode,
        showClose?: boolean
    ) {
        if (!title && !showClose) {
            return null
        }

        return (
            <div className="offcanvas-header">
                {
                    title && (
                        <h5 className="offcanvas-title">{title}</h5>
                    )
                }
                {
                    showClose && (
                        <button
                            className="text-reset btn-close"
                            onClick={this.handleClose} />
                    )
                }
            </div>
        )
    }

    handleEnter = () => {
        this.setState({
            visibility: "visible"
        })

        handleFuncProp(this.props.onShow)()
    }

    handleEntered = () => {
        handleFuncProp(this.props.onShown)()
    }

    handleExit = () => {
        handleFuncProp(this.props.onHide)()
    }

    handleExited = () => {
        this.setState({
            visibility: "hidden"
        })

        handleFuncProp(this.props.onHidden)
    }

    render() {
        const {
            className,
            title,
            visible,
            placement,
            showClose,
            backdrop,
            scroll,
            style = {},
            children,
            ...restProps
        } = this.props
        const PREFIX = "offcanvas"
        const classes = classNames(
            className,
            PREFIX,
            placement && `${PREFIX}-${placement}`
        )
        const props = omit(
            restProps,
            [
                "keyboard",
                "onShow",
                "onShown",
                "onHidden",
                "onHide"
            ]
        )

        style.visibility = this.state.visibility

        return (
            <Transition
                in={!!visible}
                onEnter={this.handleEnter}
                onEntered={this.handleEntered}
                onExit={this.handleExit}
                onExited={this.handleExited}>
                {
                    state => {
                        let className = classes

                        if (state === "entering" || state === "entered") {
                            className = `${classes} show`
                        }

                        return (
                            <>
                                <div
                                    className={className}
                                    style={style}
                                    {...props}>
                                    {this.renderHeader(title, showClose)}
                                    <div className={`${PREFIX}-body`}>{children}</div>
                                </div>
                                {
                                    backdrop && (
                                        <Backdrop
                                            visible={visible}
                                            onClick={this.handleClickBackdrop}
                                            className={`${PREFIX}-backdrop`} />
                                    )
                                }
                            </>
                        )
                    }
                }
            </Transition>
        )
    }
}