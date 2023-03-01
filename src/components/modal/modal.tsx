import React, { CSSProperties, FC } from "react"
import { Transition } from "react-transition-group"
import {
    bool,
    string,
    oneOf,
    node,
    func,
    oneOfType
} from "prop-types"
import { ModalProps } from "./types"
import Backdrop from "../basics/backdrop"
import { callAsync, classnames } from "../utils"
import NOTransition from "../basics/no-transition"
import { breakpoints, sizes } from "../commons/constants"
import {
    layerCommonPropTypes,
    toggleEventPropTypes
} from "../commons/prop-types"
import { useKeyboardClose, useZIndex } from "../hooks"
import bodyStyleStack from "../utils/body-style-stack"
import Header from "./header"
import Footer from "./footer"

const Modal: FC<ModalProps> = function Modal(
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
        okText = "确定",
        cancelText = "取消",
        className,
        children,
        style,
        tabIndex = -1,
        keyboard = true,
        fullscreen,
        footerBtnSize,
        timeout = 150,
        onKeyDown,
        onClick,
        onOk,
        onClose,
        onCancel,
        onShow,
        onShown,
        onHide,
        onHidden,
        ...restProps
    }
) {
    const modalRef = React.useRef<HTMLDivElement>(null)
    const dialogRef = React.useRef<HTMLDivElement>(null)
    const DIALOG_PREFIX = "modal-dialog"
    const FULLSCREEN_CLASS = "modal-fullscreen"
    const classes = classnames(
        className,
        "modal",
        transition && "fade"
    )
    const dialogClasses = classnames(
        DIALOG_PREFIX,
        contentScrollable && `${DIALOG_PREFIX}-scrollable`,
        center && `${DIALOG_PREFIX}-centered`,
        size && `modal-${size}`,
        fullscreen ?
            fullscreen === true ? FULLSCREEN_CLASS :
                `${FULLSCREEN_CLASS}-${fullscreen}-down` : ""
    )
    const [zIndex] = useZIndex()
    const [
        modalStyle,
        updateStyle
    ] = React.useState<CSSProperties>({ zIndex: zIndex + 1 })
    const handleEnter = () => {
        bodyStyleStack.push()
        updateStyle({
            ...modalStyle,
            display: "block"
        })
        onShow?.()
    }
    const handleEntering = () => {
        const modalEl = modalRef.current

        if (modalEl) {
            // reflow
            transition && modalEl.offsetHeight
            modalEl.classList.add("show")
        }
    }
    const handleEntered = () => {
        // if no transition, may not focus
        callAsync(() => modalRef.current?.focus())
        onShown?.()
    }
    const handleExit = () => {
        modalRef.current?.classList.remove("show")
        onHide?.()
    }
    const handleExited = () => {
        bodyStyleStack.pop()
        updateStyle({
            ...modalStyle,
            display: "none"
        })
        onHidden?.()
    }
    const handleKeyDown = useKeyboardClose({
        onKeyDown,
        onClose,
        keyboard
    })
    const handleClickClose = () => onClose?.("close")
    const transitionProps = {
        in: visible,
        onEnter: handleEnter,
        onEntering: handleEntering,
        onEntered: handleEntered,
        onExit: handleExit,
        onExited: handleExited
    }
    const handleClick = (ev: React.MouseEvent<HTMLDivElement>) => {
        if (backdrop && backdrop !== "static") {
            const target = ev.target as HTMLElement

            if (target === modalRef.current) {
                onClose?.("backdrop")
            }
        }

        onClick?.(ev)
    }
    const dialog = (
        <div
            className={classes}
            ref={modalRef}
            style={{ ...style, ...modalStyle }}
            tabIndex={tabIndex}
            onKeyDown={handleKeyDown}
            onClick={handleClick}
            {...restProps}>
            <div className={dialogClasses} ref={dialogRef}>
                <div className="modal-content">
                    <Header
                        title={title}
                        closable={closable}
                        onClose={handleClickClose}
                        defaultHeader={header} />
                    <div className="modal-body">
                        {children}
                    </div>
                    <Footer
                        okText={okText}
                        cancelText={cancelText}
                        onOk={onOk}
                        onCancel={onCancel}
                        defaultFooter={footer}
                        footerBtnSize={footerBtnSize} />
                </div>
            </div>
        </div>
    )
    const _backdrop = backdrop ? (
        <Backdrop
            visible={!!visible}
            zIndex={zIndex}
            transition={transition} />
    ) : null

    return (
        <>
            {
                transition ? (
                    <Transition
                        timeout={timeout}
                        nodeRef={modalRef}
                        {...transitionProps}>
                        {dialog}
                    </Transition>
                ) : (
                    <NOTransition {...transitionProps}>
                        {dialog}
                    </NOTransition>
                )
            }
            {_backdrop}
        </>
    )
}

Modal.propTypes = {
    contentScrollable: bool,
    size: oneOf(sizes),
    center: bool,
    header: node,
    footer: node,
    fullscreen: oneOfType([
        bool,
        oneOf(breakpoints)
    ]),
    okText: string,
    cancelText: string,
    onOk: func,
    onCancel: func,
    transition: bool,
    ...toggleEventPropTypes,
    ...layerCommonPropTypes
}

export default Modal