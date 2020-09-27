import * as React from "react"
import {
    Popover, Button 
} from "reap-ui"

export default () => (
    <Popover
        header="Popover title"
        content="And here's some amazing content. It's very engaging. Right?">
        <Button variant="danger" size="lg">
            Click to toggle popover
        </Button>
    </Popover>
)