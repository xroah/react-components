import * as React from "react"
import {
    Badge, Button 
} from "reap-ui"

export default () => (
    <Button>
        Notifications <Badge variant="light">4</Badge>
        <span className="sr-only">unread messages</span>
    </Button>
)