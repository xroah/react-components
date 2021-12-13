import * as React from "react"
import {render} from "react-dom";
import {chainFunction} from "reap-utils/lib";
import {handleFuncProp} from "reap-utils/lib/react";
import {CloseFuncParam} from "../Commons/common-types";
import Layer from "../Commons/Layer"
import Modal from "./Modal";
import {ModalCommonProps} from "./types";

let parent: HTMLElement | null = null

export type DialogType = "alert" | "confirm" | "prompt"

export interface DialogOptions extends ModalCommonProps {
    type: DialogType
}

export default class Dialog extends Layer<DialogOptions> {

    handleClose = (type?: CloseFuncParam) => {
        handleFuncProp(this.props.onClose)(type)
        this.close()
    }

    handleCancel = chainFunction(
        this.props.onCancel,
        this.close
    )

    handleOk = chainFunction(
        this.props.onOk,
        this.close
    )

    open() {
        if (!parent) {
            parent = this.createParent()
        }

        this.mount(parent)

        return super.open()
    }

    destroy() {
        if (super.destroy()) {
            parent = null
        }
    }

    render(visible: boolean) {
        let {
            onCancel,
            onOk,
            onClose,
            onShow,
            onShown,
            onHide,
            onHidden,
            backdrop = true,
            type,
            title = "提示",
            fade,
            className
        } = this.props
        // if backdrop is not false, destroy after backdrop has hidden
        onHidden = backdrop ? onHidden : this.handleExited as any
        onCancel = this.handleCancel
        onOk = this.handleOk
        onClose = this.handleClose
        const props = {
            unmountOnExit: true,
            visible,
            className,
            backdrop,
            showCancel: type !== "alert",
            title,
            fade,
            onOk,
            onClose,
            onCancel,
            onShown,
            onShow,
            onHidden,
            onHide,
            onBackdropHidden: () => this.destroy()
        }

        super.render(visible)
        render(
            <Modal {...props}>{this.msg}</Modal>,
            this.container
        )
    }
}