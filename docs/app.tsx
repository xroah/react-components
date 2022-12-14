import React from "react"
import ModalExample from "./examples/modal"
import OffCanvas from "./examples/offcanvas"
import Alert from "../src/alert"
import { showMessage } from "../src/message"
import Button from "../src/commons/button"
import CheckFill from "../src/icons/check-fill"

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
        </div>
    )
}