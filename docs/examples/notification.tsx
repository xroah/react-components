import Button from "r-layers/basics/button"
import Notification from "r-layers/notification/notification"
import React from "react"

export default function NotificationExample() {
    const [visible, setVisible] = React.useState(false)
    const toggle = () => setVisible(!visible)

    return (
        <>
            <Button onClick={toggle}>
                Toggle
            </Button>
            <Notification
                onClose={toggle}
                visible={visible}
                title="Toast title"
                secondaryTitle="11 mins ago">
                Hello, world! This is a toast message.
            </Notification>
        </>
    )
}