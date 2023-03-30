import Button from "r-layers/basics/button"
import Popup from "r-layers/popup/popup"
import React from "react"

export default function PopupExample() {
    const [visible, setVisible] = React.useState(false)
    const toggle = () => setVisible(!visible)
    const buttonRef = React.useRef(null)

    return (
        <div style={{margin: "200px 0"}}>
            <Popup
                anchorRef={buttonRef}
                visible={visible}
                offset={[10, 50]}
                overlay={<div className="overlay-example" />}>
                <Button
                    ref={buttonRef}
                    variant="success"
                    onClick={toggle}>
                    Toggle popup
                </Button>
            </Popup>
        </div>
    )
}