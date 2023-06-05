import React, { useState } from "react"
import Collapse from "r-components/collapse"
import Button from "r-components/basics/button"

export default function CollapseExample() {
    const [open, setOpen] = useState(false)
    const handleClick = () => setOpen(open => !open)

    return (
        <div>
            <Button onClick={handleClick}>Toggle</Button>
            <Collapse open={open}>
                <div className="card card-body" style={{ width: 300 }}>
                    Some placeholder content for the collapse component. This panel is hidden
                    by default but revealed when the user activates the relevant trigger.
                </div>
            </Collapse>
            <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Aspernatur consectetur voluptatum voluptatem tempore atque,
                nesciunt neque reprehenderit obcaecati. Quae, sit vitae?
                Est illum optio iure soluta alias, pariatur obcaecati consectetur.
            </div>
        </div>
    )
}