import * as React from "react"
import Modal from "./Modal"
import {
    chainFunction,
    handleFuncProp,
    classNames
} from "../utils"
import Input from "../Input"
import Dialog from "./Dialog"
import {
    PopupDialogOption,
    popupDialogType
} from "./interface"

export default class PopupDialog extends Dialog {
    private type: popupDialogType
    private inputRef = React.createRef<any>()
    options: PopupDialogOption

    constructor(type: popupDialogType, options: PopupDialogOption = {
    }) {
        super(options)

        if (!options || typeof options !== "object") {
            options = {
            }
        }

        this.type = type
        this.options = options
    }

    createDialog(visible: boolean) {
        const {
            type,
            options,
            inputRef,
            focus,
            destroy,
            onOk,
            onCancel
        } = this
        const {
            message,
            placeholder,
            defaultValue,
            className,
            ...others
        } = options
        const showOk = type !== "alert"
        others.onOk = onOk
        others.onCancel = onCancel
        others.onShown = chainFunction(options.onShown, focus)
        others.onHidden = chainFunction(options.onHidden, destroy)

        return (
            <Modal
                {...others}
                visible={visible}
                mountNode={this.container}
                className={classNames(className, "bs-popup-dialog")}
                closable={false}
                showOk={showOk}
                cancelText={showOk ? "取消" : "关闭"}
                showCancel
                header={others.title ? undefined : null}>{/* //if no title, remove the header */}
                <div className="bs-dialog-message">{message}</div>
                {
                    this.type === "prompt" && (
                        <Input
                            ref={inputRef}
                            className="bs-dialog-input"
                            onKeyDown={this.handleKeydown}
                            placeholder={placeholder}
                            defaultValue={defaultValue} />
                    )
                }
            </Modal>
        )
    }

    handleKeydown = (evt: React.KeyboardEvent) => {
        const key = evt.key.toLowerCase()

        if (key === "enter") {
            this.onOk()
        }
    }

    focus = () => {
        const {
            inputRef: {
                current: input
            }
        } = this

        input && input.focus()
    }

    getValue() {
        const {
            inputRef: {
                current: input
            }
        } = this

        if (input) {
            return input.value
        }
    }

    onOk = () => {
        const {
            type,
            options
        } = this
        const onOk = handleFuncProp(options.onOk)
        const ret: any = onOk(this.getValue())

        if (type === "alert" || ret === false) {
            return
        }

        if (ret && typeof ret.then === "function") {
            return ret.then(this.close)
        }

        this.close()
    }

    onCancel = () => {
        const onCancel = handleFuncProp(this.options.onCancel)
        const ret: any = onCancel()

        if (ret === false) {
            return
        }

        if (ret && typeof ret.then === "function") {
            return ret.then(this.close)
        }

        this.close()
    }
}

