import * as React from "react"
import DocNav from "../DocNav"
import Drawer from "../../../components/Drawer"
import { Button } from "reap-ui"

export default () => {
    const [visible, updateVisible] = React.useState(false)
    const WIDTH = 200
    const root = document.getElementById("root") as HTMLElement
    const toggle = () => {
        let afterVisible = !visible

        if (afterVisible) {
            root.style.filter = "blur(1px)"
        }
        else {
            root.style.filter = ""
        }

        updateVisible(afterVisible)
    }
    const onItemClick = (evt: React.MouseEvent<HTMLElement>) => {
        if ((evt.target as HTMLElement).classList.contains("active")) {
            return
        }

        toggle()
    }

    return (
        <Drawer
            forceRender
            visible={visible}
            width={WIDTH}
            onClose={toggle}
            style={{ zIndex: 9999 }}
            className="d-md-none drawer-nav">
            <Button
                variant="light"
                className="open-btn"
                onClick={toggle}>
                <span className={`menu-icon ${visible ? "opened" : ""}`} />
            </Button>
            <DocNav onItemClick={onItemClick} />
        </Drawer>
    )
}