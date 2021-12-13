import * as React from "react"
import Modal, {alert, confirm, prompt} from "../../src/Modal"

export default () => {
    const [visible, update] = React.useState(false)
    const handleClick = () => update(!visible)
    const hide = (arg?: any) => {
        update(false)
        console.log(arg)
    }
    const showAlert = () => {
        alert(
            "哈哈哈哈哈哈哈哈哈",
            function () {
                console.log("onOk", arguments)
            },
            {
                onClose() {
                    console.log("onClose", arguments)
                }
            }
        )
    }
    const showPrompt = () => {
        prompt(
            "请输入电话号码",
            function onOk(v, input) {
                if (!/^\d+$/.test(v)) {
                    console.log("error", v)
                    
                    if (input) {
                        input.focus()
                    }

                    return false
                }

                console.log("输入:", v)
            },
            {
                input: {
                    required: true,
                    maxLength: 15,
                    minLength: 5
                },
                errorMessage: "输入错误",
                validation: true
            }
        )
    }
    const showConfirm = () => {
        confirm(
            "嘿嘿嘿嘿嘿嘿嘿嘿嘿成功！",
            function onOk() {
                console.log("confirm", arguments)
            },
            {
                onClose() {
                    console.log("confirm close:", arguments)
                }
            }
        )
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
            <button
                className="btn btn-success ms-3"
                onClick={showConfirm}>
                Show confirm
            </button>
            <button
                className="btn btn-info ms-3"
                onClick={showPrompt}>
                Show prompt
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