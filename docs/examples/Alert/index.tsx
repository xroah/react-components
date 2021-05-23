import * as React from "react"
import Alert from "reap-ui/Alert"
import Button from "reap-ui/Button"

export default () => {
    const [visible, update] = React.useState(true)
    const handleClick = () => {
        update(!visible)
    }
    const [visible2, updateVisible] = React.useState(true)
    const onClose = () => {
        updateVisible(false)
    }

    return (
        <div>
            <div>
                <Alert variant="primary">A simple primary alert—check it out!</Alert>
                <Alert variant="secondary">A simple secondary alert—check it out!</Alert>
                <Alert variant="success">A simple success alert—check it out!</Alert>
                <Alert variant="info">A simple info alert—check it out!</Alert>
                <Alert variant="danger">A simple danger alert—check it out!</Alert>
                <Alert variant="dark">A simple dark alert—check it out!</Alert>
                <Alert variant="light">A simple light alert—check it out!</Alert>
                <Alert variant="warning">A simple warning alert—check it out!</Alert>
            </div>
            <div>
                <Button onClick={handleClick}>Toggle alert</Button>
                <Alert variant="primary" visible={visible}>
                    A simple primary alert—check it out!
                </Alert>
            </div>
            <div>
                <Alert visible={visible2} dismissible onClose={onClose}>
                    A simple dismissible alert—check it out!
                </Alert>
            </div>
        </div>
    )
}