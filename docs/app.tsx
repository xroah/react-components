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
import Input from "r-layers/basics/input"
import PopupExample from "./examples/popup"

export default function App() {
    const showMsg = () => {
        showMessage({
            content: "消息内容消息内容",
            variant: "warning",
            closable: true
        })
    }
    const [api, wrapper] = useMessage()
    const handleOpen = () => {
        api.info("士大夫士大夫大师傅地方")
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
                <Button outlined onClick={showMsg}>
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
            <div>
                <Input />
            </div>
            <PopupExample />
        </div>
    )
}