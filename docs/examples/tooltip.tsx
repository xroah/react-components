import React from "react"
import Tooltip from "r-layers/tooltip"
import Button from "r-layers/basics/button"

export default function TooltipExample() {
    const ref = React.useRef(null)

    return (
        <div style={{ margin: "300px 100px" }}>
            <Tooltip
                anchorRef={ref}
                title="This is a tooltip">
                <Button ref={ref}>
                    Toggle tooltip
                </Button>
            </Tooltip>
        </div>
    )
}