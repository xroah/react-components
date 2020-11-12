import * as React from "react"
import {
    Toast, 
    Button 
} from "reap-ui"
import icon from "../../../assets/toast.svg"

export default () => {
    const [visible, updateVisible] = React.useState(false)
    const show = () => updateVisible(true)
    const hide = () => updateVisible(false)

    return (
        <>
            <Button className="mb-3" onClick={show}>Show toast</Button>
            <Toast
                title="Bootstrap"
                icon={<Toast.Icon src={icon}/>}
                extra="just now"
                onClose={hide}
                visible={visible}
                closable={false}>
                Hello, world! This is a toast message.
            </Toast>
        </>
    )
}