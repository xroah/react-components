import * as React from "react"
import {render} from "react-dom";
import {chainFunction} from "reap-utils/lib";
import {handleFuncProp} from "reap-utils/lib/react";
import Button from "../Commons/Button";
import {
    Cb,
    CloseFuncParam,
    Size
} from "../Commons/common-types";
import Input from "../Commons/Input";
import Layer from "../Commons/Layer"
import {modalDefaultProps} from "./default-props";
import Modal from "./Modal";
import {ModalCommonProps, ModalProps} from "./types";

let parent: HTMLElement | null = null

export type DialogType = "alert" | "confirm" | "prompt"

type Base = Omit<ModalCommonProps, "onOk" | "onCancel">

export interface DialogOptions extends Base {
    inputType?: React.HTMLInputTypeAttribute
    inputDefaultValue?: string
    inputSize?: Size
    buttonSize?: Size
    onOk?: (value?: string) => void
    onCancel?: Cb
}

export interface DialogProps extends DialogOptions {
    type: DialogType
}

export default class Dialog extends Layer<DialogProps> {
    inputRef = React.createRef<HTMLInputElement>()
    okRef = React.createRef<HTMLButtonElement>()

    handleClose = (type?: CloseFuncParam) => {
        this.close()
        handleFuncProp(this.props.onClose)(type)
    }

    handleCancel = () => {
        this.close()
        handleFuncProp(this.props.onCancel)()
    }

    handleOk = () => {
        const {current: input} = this.inputRef
        let value: string | undefined

        if (input) {
            value = input.value
        }

        this.close()
        handleFuncProp(this.props.onOk)(value)
    }

    handleShown = () => {
        const {current: input} = this.inputRef
        const {current: ok} = this.okRef
        let el: HTMLElement | null = null

        if (this.props.type === "prompt") {
            el = input
        } else {
            el = ok
        }

        if (el) {
            el.focus()
        }
    }

    onShown = chainFunction(
        this.handleShown,
        this.props.onShown
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

    renderInput() {
        const {
            type,
            inputDefaultValue,
            inputSize,
            inputType
        } = this.props

        if (type !== "prompt") {
            return null
        }

        return (
            <Input
                className="mt-2"
                type={inputType}
                defaultValue={inputDefaultValue}
                size={inputSize}
                ref={this.inputRef}
                onOk={this.handleOk}
                onCancel={this.handleCancel} />
        )
    }

    renderFooter() {
        const {
            type,
            buttonSize,
            okText = modalDefaultProps.okText,
            cancelText = modalDefaultProps.cancelText
        } = this.props
        const cancelBtn = (
            <Button
                size={buttonSize}
                variant="secondary"
                onClick={this.handleCancel}>
                {cancelText}
            </Button>
        )

        return (
            <>
                {type !== "alert" && cancelBtn}
                <Button
                    size={buttonSize}
                    ref={this.okRef}
                    onClick={this.handleOk}>
                    {okText}
                </Button>
            </>
        )
    }

    render(visible: boolean) {
        let {
            onShow,
            onHide,
            onHidden,
            backdrop = true,
            title = "提示",
            fade,
            size,
            className
        } = this.props
        // if backdrop is not false, destroy after backdrop has hidden
        onHidden = backdrop ? onHidden : this.handleExited as any
        const props: ModalProps = {
            unmountOnExit: true,
            visible,
            className,
            backdrop,
            title,
            fade,
            size,
            focus: false,
            mountBackdropToBody: false,
            footer: this.renderFooter(),
            onOk: this.handleOk,
            onClose: this.handleClose,
            onCancel: this.handleCancel,
            onShown: this.onShown,
            onShow,
            onHidden,
            onHide,
            onBackdropHidden: () => this.destroy()
        }

        super.render(visible)
        render(
            <Modal {...props}>
                {this.msg}
                {this.renderInput()}
            </Modal>,
            this.container
        )
    }
}