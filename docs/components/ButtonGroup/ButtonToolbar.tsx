import * as React from "react";
import ButtonToolbar from "../../../src/ButtonToolbar";
import ButtonGroup from "../../../src/ButtonGroup";
import Button from "../../../src/Button";

export default () => (
    <>
        <ButtonToolbar>
            <ButtonGroup className="mr-2">
                <Button>1</Button>
                <Button>2</Button>
                <Button>3</Button>
                <Button>4</Button>
            </ButtonGroup>

            <ButtonGroup className="mr-2">
                <Button>5</Button>
                <Button>6</Button>
                <Button>7</Button>
            </ButtonGroup>

            <ButtonGroup>
                <Button>8</Button>
            </ButtonGroup>
        </ButtonToolbar>
    </>
);