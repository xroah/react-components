import * as React from "react"
import {
    Alert, Button 
} from "reap-ui"

export default function Dismissible() {
    const [visible, setVisible] = React.useState(true)
    const toggle = () => {
        setVisible(!visible)
    }

    return (
        <>
            <Button onClick={toggle}>Toggle</Button>
            <Alert className="mt-3" visible={visible} variant="danger">
                Holy guacamole! You should check in on some of those fields below.
            </Alert>
        </>
    )
}