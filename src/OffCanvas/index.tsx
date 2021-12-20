import * as React from "react"
import {classNames, omit} from "reap-utils/lib"
import {getFunction, Transition} from "reap-utils/lib/react"
import {
    ClosableProps,
    CloseFuncParam,
    DivProps,
    Events,
    ValueOf,
    VisibleProps
} from "../Commons/common-types"
import Backdrop from "../Commons/Backdrop"
import scrollbar from "../Commons/scrollbar"
import CloseBtn from "../Commons/CloseBtn"
import {getEventCallbacks} from "../Commons/utils"

const placements = [
    "start",
    "end",
    "top",
    "bottom"
] as const

type BaseProps = DivProps & Events & VisibleProps & ClosableProps

interface OffCanvasProps extends Omit<BaseProps, "title"> {
    keyboard?: boolean
    scroll?: boolean
    backdrop?: boolean
    placement?: ValueOf<typeof placements>
    title?: React.ReactNode
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
        closable: true,
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

    handleClose = (type?: CloseFuncParam) => {
        getFunction(this.props.onClose)(type)
    }

    handleClickBackdrop = () => {
        this.handleClose("backdrop")
    }

    handleKeyDown = (evt: React.KeyboardEvent) => {
        if (evt.key.toLowerCase() === "escape") {
            this.handleClose("esc")
        }
    }

    handleEnter = () => {
        this.setState({
            visibility: "visible"
        })

        if (!this.props.scroll) {
            scrollbar.hide()
        }
    }

    handleEntered = () => {
        if (!this.props.scroll) {
            this.elementRef.current?.focus()
        }
    }

    handleExited = () => {
        this.setState({
            visibility: "hidden"
        })

        if (!this.props.scroll) {
            scrollbar.reset()
        }
    }

    renderHeader(
        prefix: string,
        title?: React.ReactNode,
        closable?: boolean
    ) {
        if (!title && !closable) {
            return null
        }

        return (
            <div className={`${prefix}-header`}>
                <h5 className={`${prefix}-title`}>{title}</h5>
                {
                    closable && (
                        <CloseBtn
                            className="text-reset"
                            onClose={this.handleClose} />
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
            closable,
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
                "onHidden",
                "onHide",
                "onShow",
                "onShown"
            ]
        )
        const header = this.renderHeader(PREFIX, title, closable)
        style.visibility = this.state.visibility

        return (
            <>
                <Transition
                    in={!!visible}
                    nodeRef={this.elementRef}
                    {...getEventCallbacks(this)}>
                    {
                        state => {
                            let classes = classNames(
                                className,
                                PREFIX,
                                placement && `${PREFIX}-${placement}`
                            )

                            if (
                                state === "entering" ||
                                state === "entered"
                            ) {
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
                                    {header}
                                    <div className={`${PREFIX}-body`}>
                                        {children}
                                    </div>
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