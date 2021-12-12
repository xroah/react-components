import * as React from "react"
import {render} from "react-dom";
import {handleFuncProp} from "reap-utils/lib/react";
import {CloseFuncParam} from "../Commons/common-types";
import Info from "../Commons/Info"
import Modal from "./Modal";
import {ModalProps} from "./types";

let parent: HTMLElement | null = null

interface Options extends ModalProps {
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
            onHidden,
            visible: useless,
            unmountOnExit,
            children,
            type,
            title = "提示",
            ...restProps
        } = this.props
        onCancel = this.handleCancel
        onOk = this.handleOk
        onClose = this.handleClose

        super.render(visible)
        render(
            <Modal
                unmountOnExit
                visible={visible}
                onOk={onOk}
                onCancel={onCancel}
                onClose={onClose}
                onHidden={this.handleExited as any}
                showCancel={type !== "alert"}
                title={title}
                {...restProps}>
                {this.msg || children}
            </Modal>,
            this.container
        )
    }
}