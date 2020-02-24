import * as React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import Modal, { ModalCommonOptions } from "../basic/Modal";
import { chainFunction, handleFuncProp } from "../utils";
import Input from "./ModalInput";

interface ExtraModal {
    alert?: Function;
    confirm?: Function;
    prompt?: Function;
    destroyAll?: Function;
}

interface Option extends ModalCommonOptions {
    message?: string | React.ReactNode;
    placeholder?: string;
    defaultValue?: string;
}

type _Modal = typeof Modal & ExtraModal;
type dialogType = "alert" | "confirm" | "prompt";

const _Modal = Modal as _Modal;

let uuid = 0;

class ExtraModal {
    private container = document.createElement("div");
    private uuid = uuid++;
    private value: string = "";
    private type: dialogType;
    private options: Option;
    private inputRef = React.createRef<Input>();

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
            handleChange,
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
            ...others
        } = options;
        const showOk = true;
        const showCancel = type !== "alert";
        const _onHidden = chainFunction(onHidden, destroy);
        const _onShown = chainFunction(onShown, focus);
        this.value = defaultValue || "";
        others.onOk = onOk;
        others.onCancel = onCancel;

        return (
            <Modal
                {...others}
                closable={false}
                showOk={showOk}
                showCancel={showCancel}
                header={others.title ? undefined : null}//if no title, remove the header
                onShown={_onShown}
                onHidden={_onHidden}>
                {message}
                {
                    this.type === "prompt" && (
                        <Input
                            ref={inputRef}
                            placeholder={placeholder}
                            onChange={handleChange}
                            defaultValue={defaultValue} />
                    )
                }
            </Modal>
        );
    }

    focus = () => {
        const { inputRef: { current: input } } = this;

        input && input.focus();
    };

    onOk = () => {
        const {
            type,
            options,
            value
        } = this;
        const onOk = handleFuncProp(options.onOk);
        let ret: any = onOk(type === "prompt" ? value : 0);

        if (ret === false) return;

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

    handleChange = (val: any) => {
        this.value = val;
    }

    close = () => {
        this.render(false);
    }

    destroy = () => {
        let ret = unmountComponentAtNode(this.container);

        if (ret && this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
        }

        modals.forEach((m, i) => {
            if (m.uuid === this.uuid) {
                modals.splice(i, 1);
            }
        });
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

const modals: ExtraModal[] = [];
const factory = (type: dialogType) => (message?: string | Option, options?: Option) => {
    let _options: any;

    if (message == null) {
        _options = options || {};
    } else if (typeof message === "object"){
        _options = {
            ...message
        };
    } else {
        _options = {
            message: String(message),
            ...options
        };
    }

    const modal = new ExtraModal(type, _options);

    modal.createDialog();
    modal.render(true);

    modals.push(modal);

    return {
        destroy: modal.close,
        update: modal.update
    };
}

_Modal.alert = factory("alert");
_Modal.confirm = factory("confirm");
_Modal.prompt = factory("prompt");
_Modal.destroyAll = () => {
    modals.forEach(m => m.close());

    modals.length = 0;
}
export default _Modal;