import React from "react"
import ModalExample from "./examples/modal"
import OffCanvas from "./examples/offcanvas"
import Alert from "../src/alert"

export default function App() {
    return (
        <div>
            <ModalExample />
            <OffCanvas />
            <Alert closable variant="primary" >
                <div>A simple primary alert—check it out!</div>
            </Alert>
        </div>
    )
}