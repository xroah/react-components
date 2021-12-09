import * as React from "react"
import {render, unmountComponentAtNode} from "react-dom"
import {classNames} from "reap-utils/lib"
import {Fade, handleFuncProp} from "reap-utils/lib/react"
import Backdrop from "../Commons/Backdrop"
import {ModalProps, ModalState} from "./types"

export default class Modal extends React.Component<ModalProps, ModalState> {
    container: HTMLElement | null = null
    modalRef = React.createRef<HTMLDivElement>()

    static defaultProps = {
        showClose: true,
        backdrop: true,
        tabIndex: -1,
        focus: true
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

    handleEnter = () => {
        this.setState({
            display: "block"
        })
        this.renderBackdrop(true)
    }

    handleEntered = () => {
        if (this.props.focus) {
            this.modalRef.current?.focus()
        }
    }

    handleExit = () => {
    }

    handleExited = () => {
        this.setState({
            display: "none"
        })
        this.renderBackdrop(false)
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

        if (!el) {
            return null
        }

        return <div className={`${prefix}-footer`}>{el}</div>

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
        style.display = this.state.display

        return (
            <Fade
                in={!!visible}
                onEnter={this.handleEnter}
                onExit={this.handleExit}
                onExited={this.handleExited}
                hiddenOnExited={false}>
                <div
                    className={classes}
                    style={style}
                    ref={this.modalRef}
                    {...restProps}>
                    <div className={dialogClasses}>
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
            </Fade>
        )
    }
}