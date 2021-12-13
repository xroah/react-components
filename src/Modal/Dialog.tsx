import * as React from "react"
import {render} from "react-dom";
import {handleFuncProp} from "reap-utils/lib/react";
import {CloseFuncParam} from "../Commons/common-types";
import Info from "../Commons/Layer"
import Modal from "./Modal";
import {ModalCommonProps} from "./types";

let parent: HTMLElement | null = null

interface Options extends ModalCommonProps {
    type: "alert" | "confirm" | "prompt"
}

export default class Dialog extends Info<Options> {
    open() {
        if (!parent) {
            parent = this.createParent()
        }

        this.mount(parent)

        return super.open()
    }

    handleClose = (type?: CloseFuncParam) => {
        handleFuncProp(this.props.onClose)(type)
        this.close()
    }

    handleCancel = () => {
        handleFuncProp(this.props.onCancel)()
        this.close()
    }

    handleOk = () => {
        handleFuncProp(this.props.onOk)()
        this.close()
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
            onOk,
            onClose,
            onCancel,
            onShown,
            onShow,
            onHidden,
            onHide,
            onBackdropHidden: () => this.destroy(),
            showCancel: type !== "alert",
            title
        }

        super.render(visible)
        render(
            <Modal {...props}>{this.msg}</Modal>,
            this.container
        )
    }
}