import React from "react"
import Tooltip from "r-components/tooltip"
import Button from "r-components/basics/button"

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