import Button from "r-components/basics/button"
import Popup from "r-components/popup/popup"
import React from "react"

export default function PopupExample() {
    const [visible, setVisible] = React.useState(false)
    const toggle = () => setVisible(!visible)

    return (
        <div  style={{ margin: "200px 0", position: "relative" }}>
            <Popup
                visible={visible}
                offset={[10, 50]}
                unmountOnHidden={false}
                placement="top"
                transition={false}
                overlay={<div className="overlay-example" />}>
                <Button
                    variant="success"
                    onClick={toggle}>
                    Toggle popup
                </Button>
            </Popup>
        </div>
    )
}