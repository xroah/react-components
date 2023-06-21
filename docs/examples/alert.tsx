import React, { useState } from "react"
import Alert from "r-components/alert"
import Button from "r-components/button"

export default function AlertExample() {
    const [visible, setVisible] = useState(false)
    const handleClick = () => setVisible(v => !v)
    const handleClose = () => setVisible(false)

    return (
        <div>
            <Button onClick={handleClick}>
                Toggle alert
            </Button>
            <Alert
                // visible={visible}
                // fade={false}
                onClose={handleClose}
                dismissible>
                A simple primary alert—check it out!
            </Alert>
        </div>
    )
}