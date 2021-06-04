import * as React from "react"
import Badge from "reap-ui/Badge"
import Button from "reap-ui/Button"

export default () => (
    <div>
        <Badge variant="primary">primary</Badge>
        <Badge variant="warning" pill textColor="dark">warning</Badge>
        <Button className="position-relative">
            Inbox
            <Badge.Positioned>99+</Badge.Positioned>
        </Button>
        <Button className="position-relative ms-5">
            Profile
            <Badge.Indicator />
        </Button>
    </div>
)