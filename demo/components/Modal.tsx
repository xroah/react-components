import * as React from "react"
import Modal from "../../src/Modal"

export default () => {
    const [visible, update] = React.useState(false)
    const handleClick = () => update(!visible)
    const hide = () => update(false)

    return (
        <>
            <button className="btn btn-primary" onClick={handleClick}>
                Show modal
            </button>
            <Modal
                title="Modal title"
                visible={visible}
                onClose={hide}
                onOk={hide}
                backdrop="static"
                onCancel={hide}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita reprehenderit nihil earum laudantium, eum dicta natus provident sequi ex animi aliquam ea hic eaque deleniti neque, non, consequuntur distinctio aspernatur.
            </Modal>
        </>
    )
}