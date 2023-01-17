import React from "react"
import Modal from "../../src/modal/modal"
import Button from "../../src/commons/button"

export default function ModalExample() {
    const [visible, toggle] = React.useState(false)
    const handleClick = () => toggle(!visible)
    const onShow = () => {
        console.log("show")
    }
    const onShown = () => {
        console.log("shown")
    }
    const onHide = () => {
        console.log("hide")
    }
    const onHidden = () => {
        console.log("hidden")
    }
    const handleClose = () => toggle(false)
    const handleOk = () => {
        console.log("ok")
        handleClose()
    }
    const handleCancel = () => {
        console.log("cancel")
        handleClose()
    }

    return (
        <div>
            <Button onClick={handleClick}>
                Show modal
            </Button>
            <Modal
                visible={visible}
                title="Modal"
                backdrop={"static"}
                transition={false}
                size="lg"
                fullscreen="md"
                onClose={handleClose}
                onOk={handleOk}
                onCancel={handleCancel}
                onShow={onShow}
                onShown={onShown}
                onHide={onHide}
                onHidden={onHidden}>
                <div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus libero obcaecati, minus maiores id magnam tempore et officiis eveniet ex voluptatem consequuntur, iste dolores quaerat eius inventore vitae omnis animi.
                </div>
            </Modal>
        </div>
    )
}