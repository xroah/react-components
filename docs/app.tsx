import React from "react"
import ModalExample from "./examples/modal"
import OffCanvas from "./examples/offcanvas"
import Alert from "r-layers/basics/alert"
import { show as showMessage } from "r-layers/message"
import Button from "r-layers/basics/button"
import CheckFill from "r-layers/icons/check-fill"
import Loading from "./examples/loading"
import Notification from "./examples/notification"

export default function App() {
    const showMsg = () => {
        showMessage("msg", {
            variant: "primary",
            closable: true,
            duration: 10000
        })
    }

    return (
        <div>
            <ModalExample />
            <OffCanvas />
            <Alert closable variant="primary" >
                <CheckFill/>
                A simple primary alert—check it out!
            </Alert>
            <div>
                <Button onClick={showMsg}>
                    Show message
                </Button>
            </div>
            <div>
                <Loading/>
            </div>
            <Notification/>
        </div>
    )
}