import React, { CSSProperties } from "react"
import { Transition } from "react-transition-group"
import classNames from "classnames"
import { ModalProps } from "./types"
import CloseBtn from "../commons/close-btn"
import Button from "../commons/button"
import Backdrop from "../commons/backdrop"
import { getZIndex } from "../commons/utils"

export default function modal(
    {
        visible,
        transition = true,
        backdrop = true,
        contentScrollable,
        closable = true,
        title,
        size,
        center,
        header,
        footer,
        onOk,
        onClose,
        onCancel,
        onShow,
        onShown,
        onHide,
        onHidden,
        className,
        children,
        style,
        ...restProps
    }: ModalProps
) {
    const modalRef = React.useRef<HTMLDivElement>(null)
    const dialogRef = React.useRef<HTMLDivElement>(null)
    const DIALOG_PREFIX = "modal-dialog"
    const classes = classNames(
        className,
        "modal",
        "fade"
    )
    const dialogClasses = classNames(
        DIALOG_PREFIX,
        contentScrollable && `${DIALOG_PREFIX}-scrollable`,
        center && `${DIALOG_PREFIX}-centered`,
        size && `modal-${size}`
    )
    const [zIndex] = React.useState(getZIndex())
    const dialog = (
        <div className={dialogClasses} ref={dialogRef}>
            <div className="modal-content">
                {
                    header ? header : (
                        <div className="modal-header">
                            <h5 className="modal-title">
                                {title}
                            </h5>
                            {closable && <CloseBtn onClick={onClose} />}
                        </div>
                    )
                }
                <div className="modal-body">
                    {children}
                </div>
                {
                    footer ? footer : (
                        <div className="modal-footer">
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={onCancel}>
                                Close
                            </Button>
                            <Button type="button" onClick={onOk}>
                                ok
                            </Button>
                        </div>
                    )
                }
            </div>
        </div>
    )
    const [
        modalStyle,
        updateStyle
    ] = React.useState<CSSProperties>({
        ...style,
        zIndex: zIndex + 1
    })
    const handleEnter = () => {
        updateStyle({
            ...modalStyle,
            display: "block"
        })

        onShow?.()
    }
    const handleEntering = () => {
        const modalEl = modalRef.current

        if (modalEl) {
            modalEl.offsetHeight
            modalEl.classList.add("show")
        }
    }
    const handleExit = () => {
        modalRef.current?.classList.remove("show")
        onHide?.()
    }
    const handleExited = () => {
        updateStyle({
            ...modalStyle,
            display: "none"
        })

        onHidden?.()
    }

    return (
        <>
            <Transition
                in={visible}
                timeout={150}
                nodeRef={modalRef}
                onEnter={handleEnter}
                onEntering={handleEntering}
                onEntered={onShown}
                onExit={handleExit}
                onExited={handleExited}>
                <div
                    className={classes}
                    ref={modalRef}
                    style={modalStyle}
                    {...restProps}>
                    {dialog}
                </div>
            </Transition>
            {
                backdrop && (
                    <Backdrop
                        visible={!!visible}
                        zIndex={zIndex} />
                )
            }
        </>
    )
}