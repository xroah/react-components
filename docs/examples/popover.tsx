import React from "react"
import Button from "r-components/button"
import Popover from "r-components/popover"

export default function PopoverExample() {
    const ref = React.useRef<HTMLButtonElement>(null)

    return (
        <div style={{ margin: "500px 300px" }}>
            <Popover
                anchorRef={ref}           
                title="Popover title"
                content="And here's some amazing content. It's very engaging. Right?">
                <Button ref={ref}>
                    Toggle popover
                </Button>
            </Popover>
        </div>
    )
}