import * as React from "react";
import Badge from "../../../src/Badge";
import Button from "../../../src/Button";

export default () => (
    <Button>
        Profile <Badge variant="light">9</Badge>
        <span className="sr-only">unread messages</span>
    </Button>
);