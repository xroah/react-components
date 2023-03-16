import React from "react"
import ModalExample from "./examples/modal"
import OffCanvas from "./examples/offcanvas"
import Alert from "r-layers/basics/alert"
import { open as showMessage } from "r-layers/message/message-methods"
import { useMessage } from "r-layers/message/message-hook"
import Button from "r-layers/basics/button"
import CheckFill from "r-layers/icons/check-fill"
import Loading from "./examples/loading"
import Notification from "./examples/notification"

export default function App() {
    const showMsg = () => {
        showMessage("msg", {
            variant: "warning",
            closable: true
        })
    }
    const [open, wrapper] = useMessage()
    const handleOpen = () => {
        open({
            content: "哈哈哈哈哈哈哈哈哈哈",
            variant: "info"
        })
    }

    return (
        <div>
            <ModalExample />
            <OffCanvas />
            <Alert closable variant="primary" >
                <CheckFill />
                A simple primary alert—check it out!
            </Alert>
            <div>
                <Button onClick={showMsg}>
                    Show message
                </Button>
            </div>
            <div>
                <Loading />
            </div>
            <Button variant="info" onClick={handleOpen}>
                Open message use hook
            </Button>
            {wrapper}
            <Notification />
        </div>
    )
}