import React, { CSSProperties, FunctionComponent } from "react"
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
import { classnames } from "../utils"
import Dialog from "./dialog"
import NOTransition from "../basics/no-transition"
import { breakpoints, sizes } from "../../commons/constants"
import { layerCommonPropTypes, toggleEventPropTypes } from "../../commons/prop-types"
import { useZIndex } from "r-layers/hooks"
import bodyStyleStack from "r-layers/utils/body-style-stack"

const Modal: FunctionComponent<ModalProps> = function Modal(
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
        okText,
        cancelText,
        onCancel,
        onShow,
        onShown,
        onHide,
        onHidden,
        className,
        children,
        style,
        tabIndex = -1,
        keyboard = true,
        onKeyDown,
        onClick,
        fullscreen,
        ...restProps
    }
) {
    const modalRef = React.useRef<HTMLDivElement>(null)
    const classes = classnames(
        className,
        "modal",
        transition && "fade"
    )
    const [zIndex] = useZIndex()
    const [
        modalStyle,
        updateStyle
    ] = React.useState<CSSProperties>({
        ...style,
        zIndex: zIndex + 1
    })
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
        Promise.resolve().then(
            () => modalRef.current?.focus()
        )
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
    const handleKeyDown = (ev: React.KeyboardEvent<HTMLDivElement>) => {
        if (keyboard && ev.key.toLowerCase() === "escape") {
            onClose?.("keyboard")
        }

        onKeyDown?.(ev)
    }
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
            style={modalStyle}
            tabIndex={tabIndex}
            onKeyDown={handleKeyDown}
            onClick={handleClick}
            {...restProps}>
            <Dialog
                size={size}
                center={center}
                onOk={onOk}
                onCancel={onCancel}
                okText={okText}
                cancelText={cancelText}
                closable={closable}
                title={title}
                header={header}
                footer={footer}
                onClose={handleClickClose}
                contentScrollable={contentScrollable}
                fullscreen={fullscreen} >
                {children}
            </Dialog>
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
                        timeout={150}
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