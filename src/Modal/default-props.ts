import {ModalProps} from "./types";

export const modalDefaultProps: ModalProps = {
    closable: true,
    backdrop: true,
    focus: true,
    animation: true,
    keyboard: true,
    okText: "确定",
    cancelText: "取消",
    mountBackdropToBody: true
}