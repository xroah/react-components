import * as React from "react"
import {
    Navbar, Collapse 
} from "reap-ui"

export default () => {
    const [isOpen, update] = React.useState(false)
    const toggle = () => update(!isOpen)

    return (
        <>
            <Collapse isOpen={isOpen}>
                <div className="bg-dark p-4">
                    <h4 className="text-white">Collapsed content</h4>
                    <span className="text-muted">Toggleable via the navbar brand.</span>
                </div>
            </Collapse>
            <Navbar variant="dark" bg="dark">
                <Navbar.Toggle onClick={toggle} />
            </Navbar>
        </>
    )
}