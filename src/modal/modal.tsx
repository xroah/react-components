import React, { CSSProperties } from "react"
import { Transition } from "react-transition-group"
import classNames from "classnames"
import { ModalProps } from "./types"
import Backdrop from "../commons/backdrop"
import { getZIndex } from "../commons/utils"
import Dialog from "./dialog"
import NOTransition from "../commons/no-transition"

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
        ...restProps
    }: ModalProps
) {
    const modalRef = React.useRef<HTMLDivElement>(null)
    const classes = classNames(
        className,
        "modal",
        "fade"
    )
    const [zIndex] = React.useState(getZIndex())

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
            // reflow
            transition && modalEl.offsetHeight
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
    const transitionProps = {
        in: visible,
        onEnter: handleEnter,
        onEntering: handleEntering,
        onEntered: onShown,
        onExit: handleExit,
        onExited: handleExited
    }
    const dialog = (
        <div
            className={classes}
            ref={modalRef}
            style={modalStyle}
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
                onClose={onClose}
                contentScrollable={contentScrollable} >
                {children}
            </Dialog>
        </div>
    )
    const _backdrop = backdrop ? (
        <Backdrop
            visible={!!visible}
            zIndex={zIndex} />
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