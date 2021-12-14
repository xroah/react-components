import * as React from "react"
import {chainFunction, classNames, omit} from "reap-utils/lib"
import {
    Fade,
    handleFuncProp,
    NoTransition
} from "reap-utils/lib/react"
import {executeAfterTransition} from "reap-utils/lib/dom"
import scrollbar from "../Commons/scrollbar"
import {ModalProps, ModalState} from "./types"
import Backdrop from "../Commons/Backdrop"
import {CloseFuncParam} from "../Commons/common-types"
import ModalDialog from "./ModalDialog"
import {modalDefaultProps} from "./default-props"

class Modal extends React.Component<ModalProps, ModalState> {
    modalRef = React.createRef<HTMLDivElement>()
    prevFocus: HTMLElement | null = null

    static defaultProps = modalDefaultProps

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
    }

    handleEntered = () => {
        if (this.props.fade) {
            this.focus()
        }
    }

    handleExited = () => {
        if (this.prevFocus) {
            this.prevFocus.focus()

            this.prevFocus = null
        }

        this.setState({display: "none"})
        scrollbar.reset()
        this.setBackdropVisible(false)
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

    render() {
        const {
            visible,
            className,
            fade,
            tabIndex,
            backdrop,
            style = {},
            unmountOnExit,
            mountBackdropToBody,
            onBackdropHidden,
            onShown,
            onShow,
            onHidden,
            onHide,
            ...restProps
        } = this.props
        const {display, backdropVisible} = this.state
        const PREFIX = "modal"
        const classes = classNames(className, PREFIX)
        const fadeProps = {
            in: !!visible,
            nodeRef: this.modalRef,
            appear: true,
            onEnter: chainFunction(this.handleEnter, onShow),
            onEntered: chainFunction(this.handleEntered, onShown),
            onExit: onHide,
            onExited: chainFunction(this.handleExited, onHidden),
            hiddenOnExited: false,
            unmountOnExit
        }
        const dialogProps = {
            ...restProps
        }
        const props = omit(
            restProps,
            [
                "onClose",
                "keyboard",
                "focus",
                "onOk",
                "onClose",
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
                "footer"
            ]
        ) as any
        const child = (
            <div style={{
                ...style,
                display
            }}
                className={classes}
                tabIndex={(tabIndex === undefined && focus) ? -1 : tabIndex}
                ref={this.modalRef}
                onClick={this.handleClickBackdrop}
                onKeyDown={this.handleKeyDown}
                {...props}>
                <ModalDialog
                    prefix={PREFIX}
                    onClose={this.handleClose}
                    {...dialogProps} />
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
                        <Backdrop
                            className={`${PREFIX}-backdrop`}
                            fade={fade}
                            visible={backdropVisible}
                            unmountOnExit
                            mountToBody={mountBackdropToBody}
                            onHidden={onBackdropHidden} />
                    )
                }
            </>
        )
    }
}

export default Modal