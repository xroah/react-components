import {ReactNode} from "react"
import Dialog from "./Dialog"
import Modal from "./Modal"

function alert(msg: ReactNode) {
    new Dialog(msg, {
        type: "alert",
        onOk() {
            console.log("ooo")
        },
        onClose() {
            console.log(arguments)
        }
    }).open()
}

export default Modal
export {
    alert
}