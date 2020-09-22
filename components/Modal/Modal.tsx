import * as React from "react"
import PropTypes from "prop-types"
import {
    classNames,
    handleFuncProp,
    emulateTransitionEnd,
    variantArray,
    getScrollBarWidth
} from "../utils"
import Button from "../Button"
import Fade from "../Common/Fade"
import NoTransition from "../Common/NoTransition"
import {ModalContext} from "../Common/contexts"
import Portal from "../Common/Portal"
import {
    ModalProps,
    ModalState
} from "./interface"
import omitProps from "../utils/omitProps"

const stringOrNode = PropTypes.oneOfType([PropTypes.string, PropTypes.node])
let zIndex = 2000

export default class Modal extends React.Component<ModalProps, ModalState> {

    static defaultProps = {
        visible: false,
        forceRender: false,
        showCancel: true,
        showOk: true,
        closable: true,
        backdrop: true,
        fade: true,
        autoFocus: true,
        keyboard: true,
        okText: "确定",
        cancelText: "取消",
        okType: "primary",
        cancelType: "light"
    }
    static propTypes = {
        visible: PropTypes.bool,
        title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
        onOk: PropTypes.func,
        onCancel: PropTypes.func,
        okText: stringOrNode,
        cancelText: stringOrNode,
        okType: PropTypes.oneOf(variantArray),
        cancelType: PropTypes.oneOf(variantArray),
        closable: PropTypes.bool,
        showCancel: PropTypes.bool,
        header: stringOrNode,
        footer: stringOrNode,
        fade: PropTypes.bool,
        autoFocus: PropTypes.bool,
        keyboard: PropTypes.bool,
        centered: PropTypes.bool,
        scrollable: PropTypes.bool,
        size: PropTypes.oneOf(["xl", "lg", "sm"]),
        backdrop: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.oneOf(["static"])
        ]),
        onShow: PropTypes.func,
        onShown: PropTypes.func,
        onHide: PropTypes.func,
        onHidden: PropTypes.func
    }

    private dialogRef = React.createRef<HTMLDivElement>()
    private activeElement: Element | null = null
    private modalRef = React.createRef<HTMLDivElement>()
    private previousBodyPadding: string = ""
    private previousBodyClassName: string = ""
    state: ModalState = {
        zIndex: zIndex++
    }

    componentWillUnmount() {
        this.resetBody()
    }

    handleKeyDown = (evt: React.KeyboardEvent) => {
        const {
            visible, keyboard
        } = this.props
        const key = evt.key.toLowerCase()
        const keySet = new Set(["esc", "escape"])

        if (visible && keyboard && keySet.has(key)) {
            this.handleCancel(evt)
        }
    }

    handleClickBackdrop = (evt: React.MouseEvent<HTMLDivElement>) => {
        const {
            props: {
                backdrop
            },
            dialogRef: {
                current
            },
            modalRef: {
                current: modalEl
            },
            handleCancel
        } = this
        const target = evt.target

        if (
            !backdrop ||
            !modalEl ||
            !current ||
            //click the dialog
            current === target ||
            //click inside of the dialog
            current.contains(target as Node)
        ) {
            return
        }

        if (backdrop !== "static") {
            handleCancel(evt)
        }
        else {
            this.setState({
                className: "modal-static"
            })
            emulateTransitionEnd(modalEl, () => {
                this.setState({
                    className: ""
                })
            })
            this.focus()
        }
    }

    handleOk = (evt: React.MouseEvent) => {
        handleFuncProp(this.props.onOk)(evt)
    }

    handleCancel = (evt: React.MouseEvent | React.KeyboardEvent) => {
        handleFuncProp(this.props.onCancel)(evt)
    }

    focus() {
        const {
            props: {
                autoFocus
            },
            modalRef: {
                current
            }
        } = this

        if (autoFocus && current) {
            current.focus()
        }
    }

    handleEnter = () => {
        const body = document.body
        const hasScrollbar = document.documentElement.clientWidth < window.innerWidth
        const scrollWidth = getScrollBarWidth()
        const pr = parseFloat(getComputedStyle(body).getPropertyValue("padding-right"))
        this.activeElement = document.activeElement
        this.previousBodyClassName = body.className
        this.previousBodyPadding = body.style.paddingRight || ""

        body.classList.add("modal-open")

        //may has style="overflow: scroll" or something else
        const afterHasScrollbar = body.clientWidth < window.innerWidth

        if (hasScrollbar && !afterHasScrollbar) {
            body.style.paddingRight = `${pr + scrollWidth}px`
        }

        handleFuncProp(this.props.onShow)()
        this.setState({
            display: "block"
        })
    }

    handleEntered = () => {
        this.focus()
        handleFuncProp(this.props.onShown)()
    }

    handleExit = () => {
        handleFuncProp(this.props.onHide)()
    }

    resetBody() {
        const body = document.body
        body.style.paddingRight = this.previousBodyPadding
        body.className = this.previousBodyClassName
        this.activeElement = null
        this.previousBodyClassName = this.previousBodyPadding = ""
    }

    handleExited = () => {
        const ae = this.activeElement as any

        if (ae && ae.focus) {
            ae.focus()
        }

        this.resetBody()
        this.setState({
            display: ""
        })
        handleFuncProp(this.props.onHidden)()
    }

    getHeader() {
        const {
            header,
            title,
            closable,
        } = this.props

        if (header === null) {
            return null
        }

        const defaultHeader =
            <>
                <h5 className="modal-title">{title}</h5>
                {
                    closable &&
                    <button
                        type="button"
                        className="close"
                        onClick={this.handleCancel}
                        aria-label="Close">
                        <span aria-hidden="true">&times</span>
                    </button>

                }
            </>


        return (
            <div className="modal-header">
                {header === undefined ? defaultHeader : header}
            </div>
        )
    }

    getFooter() {
        const {
            footer,
            showCancel,
            cancelText,
            showOk,
            okText,
            okType,
            cancelType
        } = this.props

        if (footer === null) {
            return null
        }

        const defaultFooter =
            <>
                {
                    showCancel &&
                    <Button variant={cancelType} onClick={this.handleCancel}>
                        {cancelText}
                    </Button>

                }
                {
                    showOk &&
                    <Button variant={okType} onClick={this.handleOk}>
                        {okText}
                    </Button>

                }
            </>


        return (
            <div className="modal-footer">
                {footer === undefined ? defaultFooter : footer}
            </div>
        )
    }

    render() {
        const {
            props: {
                visible,
                fade,
                centered,
                size,
                children,
                className,
                backdrop,
                forceRender,
                scrollable,
                mountNode,
                ...otherProps
            },
            state: {
                className: stateClass,
                display,
                zIndex: z
            }
        } = this

        omitProps(
            otherProps,
            [
                "onOk",
                "onCancel",
                "onShow",
                "onShown",
                "onHide",
                "onHidden",
                "autoFocus",
                "keyboard",
                "header",
                "title",
                "closable",
                "footer",
                "showCancel",
                "showOk",
                "okText",
                "okType",
                "cancelText",
                "cancelType"
            ]
        )

        const classes = classNames(
            stateClass,
            "modal"
        )
        const PREFIX = "modal-dialog"
        const dialogClasses = classNames(
            PREFIX,
            className,
            size && `modal-${size}`,
            centered && `${PREFIX}-centered`,
            scrollable && `${PREFIX}-scrollable`
        )
        const _header = this.getHeader()
        const _footer = this.getFooter()
        const modal =
            <div
                style={{
                    display
                }}
                className={classes}
                onClick={this.handleClickBackdrop}
                onKeyDown={this.handleKeyDown}
                ref={this.modalRef}
                tabIndex={-1}>
                <div
                    className={dialogClasses}
                    ref={this.dialogRef}
                    {...otherProps as any}>
                    <div className="modal-content">
                        {_header}
                        <div className="modal-body">
                            {children}
                        </div>
                        {_footer}
                    </div>
                </div>
            </div>

        const backdropEl = <div className="modal-backdrop" />
        const transitionProps = {
            in: !!visible,
            appear: true,
            onEnter: this.handleEnter,
            onEntered: this.handleEntered,
            onExit: this.handleExit,
            onExited: this.handleExited,
        }
        const backdropProps = {
            in: !!visible,
            unmountOnExit: true
        }

        return (
            <Portal
                mountNode={mountNode}
                forceRender={forceRender}
                visible={visible}>
                <div style={{
                    zIndex: z
                }}>
                    <ModalContext.Provider value={{
                        isModal: true,
                        visible: !!visible
                    }}>
                        {
                            fade ?
                                <Fade {...transitionProps}>{modal}</Fade> :
                                <NoTransition {...transitionProps}>{modal}</NoTransition>
                        }
                        {
                            !!backdrop && (
                                fade ?
                                    <Fade {...backdropProps}>{backdropEl}</Fade> :
                                    <NoTransition showClass="show" {...backdropProps}>{backdropEl}</NoTransition>
                            )
                        }
                    </ModalContext.Provider>
                </div>
            </Portal>
        )
    }

}