import {ReactNode} from "react"
import {Cb} from "../Commons/common-types"
import Dialog,
{
    DialogOptions,
    DialogProps,
    DialogType
} from "./Dialog"
import Modal from "./Modal"

function factory(type: DialogType) {
    return (
        msg: ReactNode,
        onOk?: Cb | DialogOptions,
        options?: DialogOptions
    ) => {
        let newOptions: DialogProps = {
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

        new Dialog(msg, newOptions).open()
    }
}

export default Modal
export const alert = factory("alert")
export const confirm = factory("confirm")
export const prompt = factory("prompt")