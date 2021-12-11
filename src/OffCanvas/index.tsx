import * as React from "react"
import {classNames, omit} from "reap-utils/lib"
import {handleFuncProp, Transition} from "reap-utils/lib/react"
import {
    CloseFunc,
    CloseFuncParam,
    Events,
    ValueOf,
    VisibleProps
} from "../Commons/common-types"
import Backdrop from "../Commons/Backdrop"
import scrollbar from "../Commons/scrollbar"
import CloseBtn from "../Commons/CloseBtn"

const placements = [
    "start",
    "end",
    "top",
    "bottom"
] as const

type BaseProps = React.HTMLAttributes<HTMLDivElement> &
    Events & VisibleProps

interface OffCanvasProps extends Omit<BaseProps, "title"> {
    keyboard?: boolean
    scroll?: boolean
    backdrop?: boolean
    placement?: ValueOf<typeof placements>
    showClose?: boolean
    title?: React.ReactNode
    onClose?: CloseFunc
}

interface State {
    visibility: "visible" | "hidden",
    instance: OffCanvas
}

class OffCanvas extends React.Component<OffCanvasProps, State> {
    static defaultProps: OffCanvasProps = {
        placement: "start",
        keyboard: true,
        backdrop: true,
        showClose: true,
        scroll: false
    }

    elementRef = React.createRef<HTMLDivElement>()

    constructor(props: OffCanvasProps) {
        super(props)

        this.state = {
            visibility: props.visible ? "visible" : "hidden",
            instance: this
        }
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

    handleKeyDown = (evt: React.KeyboardEvent) => {
        if (evt.key.toLowerCase() === "escape") {
            this.onClose("esc")
        }
    }

    handleClickBackdrop = () => {
        this.onClose("backdrop")
    }

    handleEnter = () => {
        this.setState({
            visibility: "visible"
        })

        if (!this.props.scroll) {
            scrollbar.hide()
        }

        handleFuncProp(this.props.onShow)()
    }

    handleEntered = () => {
        handleFuncProp(this.props.onShown)()

        if (!this.props.scroll) {
            this.elementRef.current?.focus()
        }
    }

    handleExit = () => {
        handleFuncProp(this.props.onHide)()
    }

    handleExited = () => {
        this.setState({
            visibility: "hidden"
        })
        handleFuncProp(this.props.onHidden)

        if (!this.props.scroll) {
            scrollbar.reset()
        }
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
                {title && <h5 className="offcanvas-title">{title}</h5>}
                {
                    showClose && (
                        <CloseBtn
                            className="text-reset"
                            onClick={this.handleClose} />
                    )
                }
            </div>
        )
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
            <>
                <Transition
                    in={!!visible}
                    onEnter={this.handleEnter}
                    onEntered={this.handleEntered}
                    onExit={this.handleExit}
                    onExited={this.handleExited}>
                    {
                        state => {
                            let classes = classNames(
                                className,
                                PREFIX,
                                placement && `${PREFIX}-${placement}`
                            )

                            if (state === "entering" || state === "entered") {
                                classes = `${classes} show`
                            }

                            return (
                                <div
                                    className={classes}
                                    style={style}
                                    ref={this.elementRef}
                                    tabIndex={-1}
                                    onKeyDown={this.handleKeyDown}
                                    {...props}>
                                    {this.renderHeader(title, showClose)}
                                    <div className={`${PREFIX}-body`}>{children}</div>
                                </div>
                            )
                        }
                    }
                </Transition>
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

export default OffCanvas