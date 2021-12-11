import {ReactNode} from "react";
import {MessageItemProps, Variant} from "./Item";
import Message from "./Message";

function open(msg: ReactNode, options?: MessageItemProps) {
    return new Message(msg, options).open()
}

function factory(variant: Variant) {
    return (msg: ReactNode, options?: MessageItemProps) => {
        open(
            msg,
            {
                ...options,
                variant
            }
        )
    }
}

export default {
    open,
    success: factory("success"),
    error: factory("danger"),
    warn: factory("warning"),
    info: factory("info")
}