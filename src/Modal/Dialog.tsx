import * as React from "react"
import {render} from "react-dom";
import {handleFuncProp} from "reap-utils/lib/react";
import {Cb} from "../Commons/common-types";
import Layer from "../Commons/Layer"
import Modal from "./Modal";
import {ModalCommonProps} from "./types";

let parent: HTMLElement | null = null

export type DialogType = "alert" | "confirm" | "prompt"

type Base = Omit<ModalCommonProps, "onOk" | "onCancel">

export interface DialogOptions extends Base {
    onOk?: (value?: string) => void
    onCancel?: Cb
}

export interface DialogProps extends DialogOptions {
    type: DialogType
}

export default class Dialog extends Layer<DialogProps> {
    createCallback(
        name: "onClose" | "onOk" | "onCancel",
        noArg = true
    ) {
        return (arg?: any) => {
            const cb = handleFuncProp(this.props[name])

            cb(noArg ? undefined : arg)
            this.close()
        }
    }

    handleClose = this.createCallback("onOk", false)

    handleCancel = this.createCallback("onCancel")

    handleOk = this.createCallback("onOk")

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
            onShow,
            onShown,
            onHide,
            onHidden,
            backdrop = true,
            type,
            title = "提示",
            fade,
            size,
            className
        } = this.props
        // if backdrop is not false, destroy after backdrop has hidden
        onHidden = backdrop ? onHidden : this.handleExited as any
        const props = {
            unmountOnExit: true,
            visible,
            className,
            backdrop,
            showCancel: type !== "alert",
            title,
            fade,
            size,
            onOk: this.handleOk,
            onClose: this.handleClose,
            onCancel: this.handleCancel,
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