import * as React from "react";
import Button from "../../../src/Button";
import ButtonGroup from "../../../src/ButtonGroup";

export default () => (
    <div className="d-inline-flex flex-column">
        <ButtonGroup size="lg">
            <Button>Left</Button>
            <Button>Middle</Button>
            <Button>Right</Button>
        </ButtonGroup>
        <ButtonGroup className="mt-3">
            <Button>Left</Button>
            <Button>Middle</Button>
            <Button>Right</Button>
        </ButtonGroup>
        <ButtonGroup className="mt-3" size="sm">
            <Button>Left</Button>
            <Button>Middle</Button>
            <Button>Right</Button>
        </ButtonGroup>
    </div>
);