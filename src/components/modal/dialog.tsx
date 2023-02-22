import React from "react"
import { DialogProps } from "./types"
import { classnames } from "../utils"
import Header from "./header"
import Footer from "./footer"

export default function Dialog(
    {
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
        cancelText = "取消",
        okText = "确定",
        fullscreen,
        children
    }: DialogProps 
) {
    const dialogRef = React.useRef<HTMLDivElement>(null)
    const DIALOG_PREFIX = "modal-dialog"
    const FULLSCREEN_CLASS = "modal-fullscreen"
    const classes = classnames(
        DIALOG_PREFIX,
        contentScrollable && `${DIALOG_PREFIX}-scrollable`,
        center && `${DIALOG_PREFIX}-centered`,
        size && `modal-${size}`,
        fullscreen ?
            fullscreen === true ?
                FULLSCREEN_CLASS :
                `${FULLSCREEN_CLASS}-${fullscreen}-down` :
            ""
    )

    return (
        <div className={classes} ref={dialogRef}>
            <div className="modal-content">
                <Header
                    title={title}
                    closable={closable}
                    onClose={onClose}
                    defaultHeader={header} />
                <div className="modal-body">
                    {children}
                </div>
                <Footer
                    okText={okText}
                    cancelText={cancelText}
                    onOk={onOk}
                    onCancel={onCancel}
                    defaultFooter={footer} />
            </div>
        </div>
    )
}