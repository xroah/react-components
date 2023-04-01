import React from "react"
import Tooltip from "r-layers/tooltip"
import Button from "r-layers/basics/button"

export default function TooltipExample() {
    const [visible, setVisible] = React.useState(false)
    const toggle = () => setVisible(!visible)
    const ref = React.useRef(null)

    return (
        <div style={{ margin: "300px 100px" }}>
            <Tooltip
                // visible={visible}
                anchorRef={ref}
                title="This is a tooltip">
                <Button ref={ref} onClick={toggle}>
                    Toggle tooltip
                </Button>
            </Tooltip>
        </div>
    )
}