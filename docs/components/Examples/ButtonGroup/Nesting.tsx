import * as React from "react";
import { Dropdown, Button } from "reap-ui";

export default () => (
    <Button.Group>
        <Button>1</Button>
        <Button>2</Button>
        <Dropdown.Button
            overlay={
                <Dropdown.Menu>
                    <Dropdown.Item href="#">Action</Dropdown.Item>
                    <Dropdown.Item href="#">Another action</Dropdown.Item>
                    <Dropdown.Item href="#">Something else here</Dropdown.Item>
                </Dropdown.Menu>
            }>
            Dropdown
            </Dropdown.Button>
    </Button.Group>
);