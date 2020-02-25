import * as React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import Modal, { ModalCommonOptions } from "../../basic/Modal";
import { chainFunction, handleFuncProp, classNames } from "../../utils";
import Input from "../../basic/Input";

export interface ExtraModal {
    alert?: Function;
    confirm?: Function;
    prompt?: Function;
    destroyAll?: Function;
}

export interface Option extends ModalCommonOptions {
    message?: string | React.ReactNode;
    placeholder?: string;
    defaultValue?: string;
}
export const modals: PopupDialog[] = [];
export type dialogType = "alert" | "confirm" | "prompt";

let uuid = 0;

export default class PopupDialog {
    private container = document.createElement("div");
    private uuid = uuid++;
    private type: dialogType;
    private options: Option;
    private inputRef = React.createRef<any>();
    private closed: boolean = false;

    constructor(type: dialogType, options: Option = {}) {
        this.type = type;
        this.options = options;

        if (!options || typeof options !== "object") this.options = {};

        document.body.appendChild(this.container);
    }

    createDialog() {
        const {
            type,
            options,
            destroy,
            onOk,
            onCancel,
            inputRef,
            focus
        } = this;
        const {
            message,
            placeholder,
            defaultValue,
            onHidden,
            onShown,
            className,
            ...others
        } = options;
        const showOk = type !== "alert";
        const _onHidden = chainFunction(onHidden, destroy);
        const _onShown = chainFunction(onShown, focus);
        others.onOk = onOk;
        others.onCancel = onCancel;

        return (
            <Modal
                {...others}
                className={classNames(className, "bs-popup-dialog")}
                closable={false}
                showOk={showOk}
                cancelText={showOk ? "取消" : "关闭"}
                showCancel
                header={others.title ? undefined : null}//if no title, remove the header
                onShown={_onShown}
                onHidden={_onHidden}>
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
        );
    }

    handleKeydown = (evt: React.KeyboardEvent) => {
        const key = evt.key.toLowerCase();

        if (key === "enter") {
            this.onOk();
        }
    }

    focus = () => {
        const { inputRef: { current: input } } = this;

        input && input.focus();
    };

    getValue() {
        const { inputRef: { current: input } } = this;

        if (input) return input.value;
    }

    onOk = () => {
        const {
            type, 
            options
        } = this;
        const onOk = handleFuncProp(options.onOk);
        let ret: any = onOk(this.getValue());

        if (type === "alert" || ret === false) return;

        if (ret && typeof ret.then === "function") {
            return ret.then(this.close);
        }

        this.close();
    }

    onCancel = () => {
        const onCancel = handleFuncProp(this.options.onCancel);
        const ret: any = onCancel();

        if (ret === false) return;

        if (ret && typeof ret.then === "function") {
            return ret.then(this.close);
        }

        this.close();
    };

    close = () => {
        //already closed
        if (this.closed) return;

        this.closed = true;

        this.render(false);
    }

    destroy = () => {
        let ret = unmountComponentAtNode(this.container);

        if (ret && this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
        }
        
        for (let i = 0, l = modals.length; i < l; i++) {
            if (modals[i].uuid === this.uuid) {
                modals.splice(i, 1);
                break;
            }
        }
    }

    update = (options?: Option) => {
        this.options = {
            ...this.options,
            ...options
        };
        this.render(true);
    }

    render(visible: boolean) {
        this.options.visible = visible;

        render(
            this.createDialog(),
            this.container
        );
    }
}

