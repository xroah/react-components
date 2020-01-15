import * as React from "react";
import { Badge, Button } from "reap-ui";

export default () => (
    <Button>
        Profile <Badge variant="light">9</Badge>
        <span className="sr-only">unread messages</span>
    </Button>
);