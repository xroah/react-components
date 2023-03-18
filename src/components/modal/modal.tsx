import React, { FC } from "react"
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
    toggleEventPropTypes,
    variantPropType
} from "../commons/prop-types"
import { useKeyboardClose, useZIndex } from "../hooks"
import bodyStyleStack from "../utils/body-style-stack"
import Header from "./header"
import Footer from "./footer"
import Fade from "../basics/fade"
import Timer from "../utils/timer"

function getDialogClass(
    {
        contentScrollable,
        center,
        size,
        fullscreen
    }: ModalProps
) {
    const DIALOG_PREFIX = "modal-dialog"
    const FULLSCREEN_CLASS = "modal-fullscreen"

    let fsClass = ""

    if (fullscreen) {
        if (fullscreen === true) {
            fsClass = FULLSCREEN_CLASS
        } else {
            fsClass = `${FULLSCREEN_CLASS}-${fullscreen}-down`
        }
    }

    return classnames(
        DIALOG_PREFIX,
        contentScrollable && `${DIALOG_PREFIX}-scrollable`,
        center && `${DIALOG_PREFIX}-centered`,
        size && `modal-${size}`,
        fsClass
    )
}

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
        okVariant = "primary",
        cancelVariant = "secondary",
        okLoading = false,
        ok = true,
        cancel = true,
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
    const zIndex = useZIndex()
    const [staticClass, updateStaticClass] = React.useState("")
    const [wrapperVisible, updateWrapperState] = React.useState(visible)
    const [modalVisible, updateModalState] = React.useState(!!visible)
    const modalRef = React.useRef<HTMLDivElement>(null)
    const activeEl = React.useRef<HTMLElement | null>(null)
    const classes = classnames(className, "modal", staticClass)
    const dialogClasses = getDialogClass({
        fullscreen,
        size,
        contentScrollable,
        center
    })
    const removeStaticClass = React.useCallback(
        () => updateStaticClass(""),
        []
    )
    const timer = new Timer(300, removeStaticClass)
    const handleEnter = () => {
        activeEl.current = document.activeElement as HTMLElement
        bodyStyleStack.push()
        onShow?.()
    }
    const handleEntered = () => {
        // if no transition, may not focus
        callAsync(() => modalRef.current?.focus())
        onShown?.()
    }
    const handleExited = () => {
        bodyStyleStack.pop()
        // make the wrapper invisible
        updateWrapperState(false)
        onHidden?.()
        activeEl.current?.focus()
    }
    const handleKeyDown = useKeyboardClose({
        onKeyDown,
        onClose,
        keyboard
    })
    const handleClickClose = () => onClose?.("close")
    const handleClickBackdrop = (
        ev: React.MouseEvent<HTMLDivElement>
    ) => {
        if (backdrop) {
            const target = ev.target as HTMLElement

            if (target !== modalRef.current) {
                return
            }

            if (backdrop === "static") {
                updateStaticClass("modal-static")
                timer.delay()
            } else {
                onClose?.("backdrop")
            }
        }

        onClick?.(ev)
    }
    const display = style?.display ?? "block"
    const modalStyle = {
        display: display === "none" ? "block" : display,
    }
    const modal = (
        <div
            className={classes}
            ref={modalRef}
            style={{
                zIndex: zIndex + 1,
                ...style,
                ...modalStyle
            }}
            tabIndex={tabIndex}
            onKeyDown={handleKeyDown}
            onClick={handleClickBackdrop}
            {...restProps}>
            <div className={dialogClasses}>
                <div className="modal-content">
                    <Header
                        title={title}
                        closable={closable}
                        onClose={handleClickClose}
                        defaultHeader={header} />
                    <div className="modal-body">{children}</div>
                    <Footer
                        okText={okText}
                        okVariant={okVariant}
                        ok={ok}
                        okLoading={okLoading}
                        cancelText={cancelText}
                        cancelVariant={cancelVariant}
                        cancel={cancel}
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
            visible={!!modalVisible}
            zIndex={zIndex}
            transition={transition} />
    ) : null
    const transitionProps = {
        in: modalVisible,
        onEnter: handleEnter,
        onEntered: handleEntered,
        onExit: onHide,
        onExited: handleExited
    }

    React.useEffect(
        () => {
            if (visible) {
                // make the wrapper visible first
                updateWrapperState(true)

                if (wrapperVisible) {
                    updateModalState(true)
                }
            } else {
                updateModalState(false)
            }
        },
        [visible, wrapperVisible, modalVisible]
    )

    return (
        <div style={{ display: wrapperVisible ? "block" : "none" }}>
            {
                transition ? (
                    <Fade
                        timeout={timeout}
                        nodeRef={modalRef}
                        appear
                        {...transitionProps}>
                        {modal}
                    </Fade>
                ) : (
                    <NOTransition {...transitionProps}>
                        {modal}
                    </NOTransition>
                )
            }
            {_backdrop}
        </div>
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
    ok: bool,
    cancel: bool,
    okVariant: variantPropType,
    cancelVariant: variantPropType,
    okText: string,
    cancelText: string,
    onOk: func,
    onCancel: func,
    transition: bool,
    ...toggleEventPropTypes,
    ...layerCommonPropTypes
}

export default Modal