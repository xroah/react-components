import * as React from "react"
import Notification, {Options} from "./Notification"

export default {
    open(msg: React.ReactNode, options?: Options) {
        return new Notification(msg, options).open()
    },
    close(n: Notification) {
        if (n instanceof Notification) {
            n.close()
        }
    },
    destroy(n: Notification) {
        if (n instanceof Notification) {
            n.destroy()
        }
    }
}

export {
    Notification
}