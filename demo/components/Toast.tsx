import * as React from "react"
import Toast from "../../src/Toast"

export default () => {
    const [visible, update] = React.useState(false)
    const handleClick = () => update(!visible)
    const hide = () => update(false)

    return (
        <>
            <button className="btn btn-primary" onClick={handleClick}>
                Toggle toast
            </button>
            <Toast
                onClose={hide}
                title="Bootstrap"
                extra="11 mins ago"
                visible={visible}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur pariatur, debitis tempora commodi, perferendis, quas est labore itaque placeat voluptatibus suscipit! Provident reprehenderit libero commodi eveniet, sequi assumenda amet modi.
            </Toast>
        </>
    )
}