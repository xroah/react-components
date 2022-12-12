import React from "react"
import ModalExample from "./examples/modal"
import OffCanvas from "./examples/offcanvas"
import Alert from "../src/alert"
import { showMessage } from "../src/message"
import Button from "../src/commons/button"

export default function App() {
    const showMsg = () => {
        showMessage("msg", {
            variant: "primary"
        })
    }

    return (
        <div>
            <ModalExample />
            <OffCanvas />
            <Alert closable variant="primary" >
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