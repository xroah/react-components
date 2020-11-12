import * as React from "react"
import {
    Toast, Button 
} from "reap-ui"
import icon from "../../../assets/toast.svg"

export default () => {
    const [visible, updateVisible] = React.useState(false)
    const toggle = () => updateVisible(!visible)

    return (
        <>
            <Button className="mb-3" onClick={toggle}>Toggle</Button>
            <Toast
                title="Bootstrap"
                icon={<Toast.Icon src={icon}/>}
                extra="just now"
                onClose={toggle}
                autoHide={false}
                visible={visible}
                closable>
                Hello, world! This is a toast message.
            </Toast>
        </>
    )
}