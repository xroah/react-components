import React from "react"
import Modal from "r-layers/modal/modal"
import { open } from "r-layers/modal/modal-methods"
import Button from "r-layers/basics/button"
import { useModal } from "r-layers/modal/modal-hook"

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
    const openModal = () => {
        open({
            title: "Modal title",
            content: "内容内容内容内容内容内容内容内容内容内容",
            onOk() {
                return new Promise<void>(resolve => {
                    console.log("请稍后")

                    setTimeout(
                        () => {
                            resolve()
                            console.log("close")
                        },
                        Math.random() * 10000
                    )
                })
            }
        })
    }
    const [hookApi, modal] = useModal()
    const handleOpenModalByHook = () => {
        hookApi.open({
            title: "Hook modal title",
            content: "hook内容 hook内容 hook内容 hook内容",
            onOk() {
                console.log("onOk called")
            },
            onCancel() {
                console.log("onCancel called")
            },
            onShown() {
                console.log("Modal shown")
            }
        })
    }

    return (
        <div>
            <Button onClick={handleClick}>
                Show modal
            </Button>
            <Button onClick={openModal}>
                Open dynamic modal
            </Button>
            <Button onClick={handleOpenModalByHook}>
                Open modal by hook
            </Button>
            {modal}
            <Modal
                visible={visible}
                title="Modal"
                backdrop={"static"}
                // transition={false}
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