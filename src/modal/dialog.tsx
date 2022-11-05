import React from "react"
import { DialogProps } from "./types"
import classnames from "classnames"
import CloseBtn from "../commons/close-btn"
import Button from "../commons/button"

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
        children
    }: DialogProps
) {
    const dialogRef = React.useRef<HTMLDivElement>(null)
    const DIALOG_PREFIX = "modal-dialog"
    const classes = classnames(
        DIALOG_PREFIX,
        contentScrollable && `${DIALOG_PREFIX}-scrollable`,
        center && `${DIALOG_PREFIX}-centered`,
        size && `modal-${size}`
    )
    const _header = (
        header === null ? null :
            header ? header : (
                <div className="modal-header">
                    <h5 className="modal-title">
                        {title}
                    </h5>
                    {closable && <CloseBtn onClick={onClose} />}
                </div>
            )
    )
    const _footer = (
        footer === null ? null :
            footer ? footer : (
                <div className="modal-footer">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onCancel}>
                        {cancelText}
                    </Button>
                    <Button type="button" onClick={onOk}>
                        {okText}
                    </Button>
                </div>
            )
    )

    return (
        <div className={classes} ref={dialogRef}>
            <div className="modal-content">
                {_header}
                <div className="modal-body">
                    {children}
                </div>
                {_footer}
            </div>
        </div>
    )
}