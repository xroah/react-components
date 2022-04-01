import * as React from "react"
import {classNames, omit} from "reap-utils/lib"
import {Fade, NoTransition} from "reap-utils/lib/react"
import {executeAfterTransition} from "reap-utils/lib/dom"
import scrollbar from "../Commons/scrollbar"
import {ModalProps, ModalState} from "./types"
import Backdrop from "../Commons/Backdrop"
import {CloseFuncParam} from "../Commons/common-types"
import ModalDialog from "./ModalDialog"
import {modalDefaultProps} from "./default-props"
import {getEventCallbacks} from "../Commons/utils"

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

        this.setState({display: "block"})
        scrollbar.hide()
        this.setBackdropVisible(true)
    }

    handleEntered = () => {
        this.focus()
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

    close(condition?: boolean, type?: CloseFuncParam) {
        if (condition) {
            this.props.onClose?.(type)
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
            animation,
            tabIndex,
            backdrop,
            style = {},
            unmountOnExit,
            mountBackdropToBody,
            onBackdropHidden,
            onClose,
            ...restProps
        } = this.props
        const {display, backdropVisible} = this.state
        const PREFIX = "modal"
        const classes = classNames(className, PREFIX)
        const dialogProps = {
            ...restProps
        }
        const props = omit(
            restProps,
            [
                "keyboard",
                "focus",
                "onOk",
                "okText",
                "cancelText",
                "verticalCenter",
                "scrollable",
                "size",
                "fullscreen",
                "title",
                "children",
                "closable",
                "footer",
                "onShown",
                "onShow",
                "onHidden",
                "onHide",
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
                    onClose={onClose}
                    {...dialogProps} />
            </div>
        )
        const fadeProps = {
            in: !!visible,
            nodeRef: this.modalRef,
            appear: true,
            hiddenOnExited: false,
            unmountOnExit,
            children: child,
            ...getEventCallbacks(this)
        }
        const el = animation ?
            <Fade {...fadeProps} /> :
            <NoTransition {...fadeProps} />

        return (
            <>
                {el}
                {
                    backdrop && (
                        <Backdrop
                            className={`${PREFIX}-backdrop`}
                            animation={animation}
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