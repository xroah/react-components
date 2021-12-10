import * as React from "react"
import {render, unmountComponentAtNode} from "react-dom"
import {classNames, omit} from "reap-utils/lib"
import {
    Fade,
    handleFuncProp,
    NoTransition
} from "reap-utils/lib/react"
import {executeAfterTransition} from "reap-utils/lib/dom"
import Backdrop from "../Commons/Backdrop"
import {CloseFuncParam} from "../Commons/common-types"
import scrollbar from "../Commons/scrollbar"
import {ModalProps, ModalState} from "./types"

export default class Modal extends React.Component<ModalProps, ModalState> {
    container: HTMLElement | null = null
    modalRef = React.createRef<HTMLDivElement>()
    dialogRef = React.createRef<HTMLDivElement>()
    prevFocus: HTMLElement | null = null

    static defaultProps: ModalProps = {
        showClose: true,
        backdrop: true,
        focus: true,
        fade: true,
        keyboard: true
    }

    constructor(props: ModalProps) {
        super(props)

        this.state = {
            display: props.visible ? "block" : "none"
        }
    }

    handleClose = () => {
        handleFuncProp(this.props.onClose)()
    }

    focus() {
        if (this.props.focus) {
            this.modalRef.current?.focus()
        }
    }

    handleEnter = () => {
        this.setState(
            {display: "block"},
            () => {
                // if no fade, call focus within handleEntered
                // may not work
                if (!this.props.fade) {
                    this.focus()
                }
            }
        )
        this.renderBackdrop(true)
        scrollbar.hide()
        handleFuncProp(this.props.onShow)()

        this.prevFocus = document.activeElement as HTMLElement
    }

    handleEntered = () => {
        if (this.props.fade) {
            this.focus()
        }

        handleFuncProp(this.props.onShown)()
    }

    handleExit = () => {
        handleFuncProp(this.props.onHide)()
    }

    handleExited = () => {
        this.setState({
            display: "none"
        })
        this.renderBackdrop(false)
        scrollbar.reset()
        handleFuncProp(this.props.onHidden)

        if (this.prevFocus) {
            this.prevFocus.focus()

            this.prevFocus = null
        }
    }

    onClose(type: CloseFuncParam) {
        const {onClose} = this.props

        if (onClose) {
            onClose(type)
        }
    }

    handleKeyDown = (evt: React.KeyboardEvent) => {
        if (evt.key.toLowerCase() === "escape") {
            if (this.props.keyboard) {
                this.onClose("esc")
            } else {
                this.handleStatic()
            }
        }

        evt.stopPropagation()
        evt.preventDefault()
    }

    handleStatic() {
        const CLASS = "modal-static"
        const modal = this.modalRef.current

        if (!modal) {
            return
        }

        if (!modal.classList.contains(CLASS)) {
            executeAfterTransition(
                modal,
                () => modal.classList.remove(CLASS)
            )

            modal.classList.add(CLASS)
        }
    }

    handleClickBackdrop = (evt: React.MouseEvent) => {
        const {backdrop} = this.props
        const inBackdrop = evt.target === evt.currentTarget

        if (backdrop) {
            if (inBackdrop) {
                if (backdrop === "static") {
                    this.handleStatic()
                } else {
                    this.onClose("backdrop")
                }
            }
        }
    }

    removeBackdrop = () => {
        if (this.container) {
            unmountComponentAtNode(this.container)
            document.body.removeChild(this.container)

            this.container = null
        }
    }

    renderBackdrop(visible: boolean) {
        const {backdrop} = this.props

        if (!backdrop) {
            return
        }

        if (!this.container) {
            this.container = document.createElement("div")

            document.body.appendChild(this.container)
        }

        render(
            <Backdrop
                className="modal-backdrop"
                onExited={this.removeBackdrop}
                onClick={this.handleClickBackdrop}
                visible={visible} />,
            this.container
        )
    }

    renderFooter(prefix: string) {
        const {
            footer,
            okText = "确定",
            cancelText = "取消",
            onOk,
            onCancel
        } = this.props
        let el: React.ReactNode = null

        if (footer === undefined) {
            const handleOk = () => handleFuncProp(onOk)()
            const handleCancel = () => handleFuncProp(onCancel)()

            el = (
                <>
                    <button
                        className="btn btn-secondary"
                        onClick={handleCancel}>
                        {cancelText}
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={handleOk}>
                        {okText}
                    </button>
                </>
            )
        } else if (footer) {
            el = footer
        }

        return el ? <div className={`${prefix}-footer`}>{el}</div> : null

    }

    render() {
        const {
            visible,
            title,
            footer,
            className,
            verticalCenter,
            scrollable,
            size,
            fullscreen,
            children,
            showClose,
            fade,
            tabIndex,
            focus,
            style = {},
            ...restProps
        } = this.props
        const PREFIX = "modal"
        const DIALOG_PREFIX = `${PREFIX}-dialog`
        const FULLSCREEN_PREFIX = `${PREFIX}-fullscreen`
        const classes = classNames(
            className,
            PREFIX
        )
        const dialogClasses = classNames(
            DIALOG_PREFIX,
            verticalCenter && `${DIALOG_PREFIX}-centered`,
            scrollable && `${DIALOG_PREFIX}-scrollable`,
            size && `${PREFIX}-${size}`,
            fullscreen ?
                fullscreen !== true ?
                    `${FULLSCREEN_PREFIX}-${fullscreen}-down` :
                    FULLSCREEN_PREFIX : ""
        )
        const titleEl = title ? (
            <h5 className={`${PREFIX}-title`}>
                {title}
            </h5>
        ) : null
        const closeBtn = showClose ? (
            <button className="btn-close" onClick={this.handleClose} />
        ) : null
        const fadeProps = {
            in: !!visible,
            onEnter: this.handleEnter,
            onEntered: this.handleEntered,
            onExit: this.handleExit,
            onExited: this.handleExited,
            hiddenOnExited: false
        }
        style.display = this.state.display
        const props = omit(
            restProps,
            [
                "onOk",
                "onClose",
                "onShow",
                "onShown",
                "onHidden",
                "onHide",
                "okText",
                "cancelText",
                "keyboard",
                "backdrop",
            ]
        )
        const child = (
            <div
                className={classes}
                style={style}
                tabIndex={(tabIndex === undefined && focus) ? -1 : tabIndex}
                ref={this.modalRef}
                onClick={this.handleClickBackdrop}
                onKeyDown={this.handleKeyDown}
                {...props}>
                <div className={dialogClasses} ref={this.dialogRef}>
                    <div className={`${PREFIX}-content`}>
                        <div className={`${PREFIX}-header`}>
                            {titleEl}
                            {closeBtn}
                        </div>
                        <div className={`${PREFIX}-body`}>
                            {children}
                        </div>
                        {this.renderFooter(PREFIX)}
                    </div>
                </div>
            </div>
        )

        return fade ?
            <Fade {...fadeProps}>{child}</Fade> :
            <NoTransition {...fadeProps}>{child}</NoTransition>
    }
}