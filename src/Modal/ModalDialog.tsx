import * as React from "react"
import {classNames} from "reap-utils/lib";
import CloseBtn from "../Commons/CloseBtn";
import {ModalProps} from "./types";

interface ModalDialogProps extends ModalProps {
    prefix: string
    footer?: React.ReactNode
}

export default function ModalDialog(
    {
        verticalCenter,
        scrollable,
        size,
        fullscreen,
        title,
        closable,
        children,
        prefix,
        footer,
        okText,
        cancelText,
        showCancel,
        showOk,
        onOk,
        onCancel,
        onClose
    }: ModalDialogProps
) {
    const DIALOG_PREFIX = `${prefix}-dialog`
    const FULLSCREEN_PREFIX = `${prefix}-fullscreen`
    const dialogClasses = classNames(
        DIALOG_PREFIX,
        verticalCenter && `${DIALOG_PREFIX}-centered`,
        scrollable && `${DIALOG_PREFIX}-scrollable`,
        size && `${prefix}-${size}`,
        fullscreen ?
            fullscreen !== true ?
                `${FULLSCREEN_PREFIX}-${fullscreen}-down` :
                FULLSCREEN_PREFIX : ""
    )
    let footerEl: React.ReactNode = null

    if (footer === undefined && (showOk || showCancel)) {
        footerEl = (
            <>
                {
                    showCancel && (
                        <button
                            className="btn btn-secondary"
                            onClick={onCancel}>
                            {cancelText}
                        </button>
                    )
                }
                {
                    showOk && (
                        <button
                            className="btn btn-primary"
                            onClick={onOk}>
                            {okText}
                        </button>
                    )
                }
            </>
        )
    } else if (footer) {
        footerEl = footer
    }

    footerEl = footerEl ? (
        <div className={`${prefix}-footer`}>
            {footerEl}
        </div>
    ) : null

    return (
        <div className={dialogClasses}>
            <div className={`${prefix}-content`}>
                <div className={`${prefix}-header`}>
                    <h5 className={`${prefix}-title`}>
                        {title}
                    </h5>
                    {closable && <CloseBtn onClose={onClose} />}
                </div>
                <div className={`${prefix}-body`}>
                    {children}
                </div>
                {footerEl}
            </div>
        </div>
    )
}