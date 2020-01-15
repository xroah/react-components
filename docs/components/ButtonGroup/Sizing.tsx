import * as React from "react";
import { Button } from "reap-ui";

export default () => (
    <div className="d-inline-flex flex-column">
        <Button.Group size="lg">
            <Button>Left</Button>
            <Button>Middle</Button>
            <Button>Right</Button>
        </Button.Group>
        <Button.Group className="mt-3">
            <Button>Left</Button>
            <Button>Middle</Button>
            <Button>Right</Button>
        </Button.Group>
        <Button.Group className="mt-3" size="sm">
            <Button>Left</Button>
            <Button>Middle</Button>
            <Button>Right</Button>
        </Button.Group>
    </div>
);