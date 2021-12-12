import * as React from "react"
import {classNames, omit} from "reap-utils/lib"
import {
    Fade,
    handleFuncProp,
    NoTransition
} from "reap-utils/lib/react"
import {executeAfterTransition} from "reap-utils/lib/dom"
import scrollbar from "../Commons/scrollbar"
import {ModalProps, ModalState} from "./types"
import ModalBackdrop from "./ModalBackdrop"
import CloseBtn from "../Commons/CloseBtn"
import {CloseFuncParam} from "../Commons/common-types"

class Modal extends React.Component<ModalProps, ModalState> {
    modalRef = React.createRef<HTMLDivElement>()
    prevFocus: HTMLElement | null = null

    static defaultProps: ModalProps = {
        closable: true,
        backdrop: true,
        focus: true,
        fade: true,
        keyboard: true,
        showOk: true,
        showCancel: true
    }

    constructor(props: ModalProps) {
        super(props)

        this.state = {
            display: props.visible ? "block" : "none"
        }
    }

    focus() {
        if (this.props.focus) {
            this.modalRef.current?.focus()
        }
    }

    setBackdropVisible(visible: boolean) {
        if (this.props.backdrop) {
            this.setState({backdropVisible: visible})
        }
    }

    handleEnter = () => {
        this.prevFocus = document.activeElement as HTMLElement

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
        scrollbar.hide()
        this.setBackdropVisible(true)
        handleFuncProp(this.props.onShow)()
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
        if (this.prevFocus) {
            this.prevFocus.focus()

            this.prevFocus = null
        }

        this.setState({display: "none"})
        scrollbar.reset()
        this.setBackdropVisible(false)
        handleFuncProp(this.props.onHidden)()
    }

    handleClose = (type?: CloseFuncParam) => {
        handleFuncProp(this.props.onClose)(type)
    }

    close(condition?: boolean, type?: CloseFuncParam) {
        if (condition) {
            this.handleClose(type)
        } else {
            this.handleStatic()
        }
    }

    handleKeyDown = (evt: React.KeyboardEvent) => {
        if (evt.key.toLowerCase() === "escape") {
            this.close(this.props.keyboard, "esc")
        }

        evt.stopPropagation()
        evt.preventDefault()
    }

    handleStatic() {
        const CLASS = "modal-static"
        const modal = this.modalRef.current

        if (modal) {
            if (!modal.classList.contains(CLASS)) {
                const remove = () => modal.classList.remove(CLASS)

                modal.classList.add(CLASS)
                executeAfterTransition(modal, remove)
            }
        }
    }

    handleClickBackdrop = (evt: React.MouseEvent) => {
        const {backdrop} = this.props
        const inBackdrop = evt.target === evt.currentTarget

        if (!backdrop) {
            return
        }

        if (inBackdrop) {
            this.close(backdrop !== "static", "backdrop")
        }
    }

    renderFooter(prefix: string) {
        const {
            footer,
            okText = "确定",
            cancelText = "取消",
            showCancel,
            showOk,
            onOk,
            onCancel
        } = this.props
        let el: React.ReactNode = null

        if (footer === undefined && (showOk || showCancel)) {
            el = (
                <>
                    {
                        showCancel && (
                            <button
                                className="btn btn-secondary"
                                onClick={onCancel}>
                                {cancelText}
                            </button>
                        )
                    }
                    {
                        showOk && (
                            <button
                                className="btn btn-primary"
                                onClick={onOk}>
                                {okText}
                            </button>
                        )
                    }
                </>
            )
        } else if (footer) {
            el = footer
        }

        return el ? (
            <div className={`${prefix}-footer`}>
                {el}
            </div>
        ) : null
    }

    renderDialog(prefix: string) {
        const {
            verticalCenter,
            scrollable,
            size,
            fullscreen,
            title,
            closable,
            children
        } = this.props
        const DIALOG_PREFIX = `${prefix}-dialog`
        const FULLSCREEN_PREFIX = `${prefix}-fullscreen`
        const dialogClasses = classNames(
            DIALOG_PREFIX,
            verticalCenter && `${DIALOG_PREFIX}-centered`,
            scrollable && `${DIALOG_PREFIX}-scrollable`,
            size && `${prefix}-${size}`,
            fullscreen ?
                fullscreen !== true ?
                    `${FULLSCREEN_PREFIX}-${fullscreen}-down` :
                    FULLSCREEN_PREFIX : ""
        )
        const closeBtn = closable ? (
            <CloseBtn onClose={this.handleClose} />
        ) : null

        return (
            <div className={dialogClasses}>
                <div className={`${prefix}-content`}>
                    <div className={`${prefix}-header`}>
                        <h5 className={`${prefix}-title`}>
                            {title}
                        </h5>
                        {closeBtn}
                    </div>
                    <div className={`${prefix}-body`}>
                        {children}
                    </div>
                    {this.renderFooter(prefix)}
                </div>
            </div>
        )
    }

    render() {
        const {
            visible,
            footer,
            className,
            fade,
            tabIndex,
            backdrop,
            focus,
            style = {},
            unmountOnExit,
            mountBackdropToBody,
            onBackdropHidden,
            ...restProps
        } = this.props
        const {display, backdropVisible} = this.state
        const PREFIX = "modal"
        const classes = classNames(className, PREFIX)
        const fadeProps = {
            in: !!visible,
            nodeRef: this.modalRef,
            appear: true,
            onEnter: this.handleEnter,
            onEntered: this.handleEntered,
            onExit: this.handleExit,
            onExited: this.handleExited,
            hiddenOnExited: false,
            unmountOnExit
        }
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
                "verticalCenter",
                "scrollable",
                "size",
                "fullscreen",
                "title",
                "children",
                "closable",
                "showCancel",
                "showOk"
            ]
        ) as any
        const child = (
            <div
                style={{
                    ...style,
                    display
                }}
                className={classes}
                tabIndex={(tabIndex === undefined && focus) ? -1 : tabIndex}
                ref={this.modalRef}
                onClick={this.handleClickBackdrop}
                onKeyDown={this.handleKeyDown}
                {...props}>
                {this.renderDialog(PREFIX)}
            </div>
        )
        const el = fade ?
            <Fade {...fadeProps}>{child}</Fade> :
            <NoTransition {...fadeProps}>{child}</NoTransition>

        return (
            <>
                {el}
                {
                    backdrop && (
                        <ModalBackdrop
                            mountToBody={mountBackdropToBody}
                            onExited={onBackdropHidden}
                            visible={backdropVisible} />
                    )
                }
            </>
        )
    }
}

export default Modal