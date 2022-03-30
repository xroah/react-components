import * as React from "react"
import {chainFunction, noop} from "reap-utils/lib";
import Button from "../Commons/Button";
import {CloseFuncParam} from "../Commons/common-types";
import Input from "../Commons/Input";
import Layer from "../Commons/Layer"
import {modalDefaultProps} from "./default-props";
import Modal from "./Modal";
import {DialogProps, ModalProps} from "./types";

export default class Dialog extends Layer<DialogProps> {
    inputRef = React.createRef<HTMLInputElement>()
    okRef = React.createRef<HTMLButtonElement>()
    formRef = React.createRef<HTMLFormElement>()

    handleClose = (type?: CloseFuncParam) => {
        this.close()
        this.props.onClose?.(type)
    }

    handleCancel = () => {
        this.close()
        this.props.onCancel?.()
    }

    handleOk = () => {
        const {current: input} = this.inputRef
        const {current: form} = this.formRef
        let {onOk, validation} = this.props
        let value: string | undefined

        if (typeof onOk !== "function") {
            onOk = noop
        }

        if (validation && form) {
            const valid = form.checkValidity()

            form.classList.add("was-validated")

            if (!valid) {
                if (input) {
                    input.focus()
                }

                return
            }
        }

        if (input) {
            value = input.value
        }

        if (onOk(value, input) !== false) {
            this.close()
        }
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

    open() {
        this.mount(Dialog.createParent(), this.container)

        return super.open()
    }

    renderInput() {
        const {
            type,
            input,
            errorMessage,
            validation
        } = this.props

        if (type !== "prompt") {
            return null
        }

        const props = {
            ...input,
            onOk: this.handleOk
        }

        return (
            <form
                ref={this.formRef}
                className={validation ? "needs-validation" : undefined}
                noValidate>
                <Input
                    className="mt-3"
                    ref={this.inputRef}
                    {...props} />
                {
                    errorMessage && (
                        <div className="invalid-feedback">
                            {errorMessage}
                        </div>
                    )
                }
            </form>
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
            onShown,
            onHide,
            onHidden,
            backdrop = true,
            title = "提示",
            animation,
            size,
            className
        } = this.props
        // if backdrop is not false, destroy after backdrop has hidden
        onHidden = chainFunction(this.onHidden, onHidden)
        onShown = chainFunction(this.handleShown, onShown)
        const props: ModalProps = {
            unmountOnExit: true,
            visible,
            className,
            backdrop,
            title,
            animation,
            size,
            focus: false,
            mountBackdropToBody: false,
            footer: this.renderFooter(),
            onOk: this.handleOk,
            onClose: this.handleClose,
            onCancel: this.handleCancel,
            onShown,
            onShow,
            onHidden,
            onHide
        }

        super.render(visible)
        this.root.render(
            <Modal {...props}>
                {this.msg}
                {this.renderInput()}
            </Modal>
        )
    }
}