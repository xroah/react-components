import * as React from "react"
import Modal, {alert} from "../../src/Modal"

export default () => {
    const [visible, update] = React.useState(false)
    const handleClick = () => update(!visible)
    const hide = (arg?: any) => {
        update(false)
        console.log(arg)
    }
    const showAlert = () => {
        alert("哈哈哈哈哈哈哈哈哈")
    }

    return (
        <>
            <button className="btn btn-primary" onClick={handleClick}>
                Show modal
            </button>
            <button
                className="btn btn-danger ms-3"
                onClick={showAlert}>
                Show alert 
            </button>
            <Modal
                title="Modal title"
                visible={visible}
                onClose={hide}
                onOk={hide}
                fade={false}
                backdrop="static"
                onCancel={hide}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita reprehenderit nihil earum laudantium, eum dicta natus provident sequi ex animi aliquam ea hic eaque deleniti neque, non, consequuntur distinctio aspernatur.
            </Modal>
        </>
    )
}