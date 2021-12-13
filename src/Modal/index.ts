import {ReactNode} from "react"
import Dialog, {DialogOptions, DialogType} from "./Dialog"
import Modal from "./Modal"
import {ClickCb, ModalCommonProps} from "./types"

function factory(type: DialogType) {
    return (
        msg: ReactNode,
        onOk?: ClickCb | ModalCommonProps,
        options: ModalCommonProps = {}
    ) => {
        let newOptions: DialogOptions = {
            ...options,
            type
        }

        if (typeof onOk === "object") {
            // merge and override properties of onOk
            newOptions = {
                ...onOk,
                ...newOptions
            }
        } else if (typeof onOk === "function") {
            newOptions.onOk = onOk
        }

        new Dialog(msg, newOptions)
    }
}

export default Modal
export const alert = factory("alert")
export const confirm = factory("confirm")
export const prompt = factory("prompt")