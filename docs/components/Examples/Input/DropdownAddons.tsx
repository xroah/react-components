import * as React from "react";
import { Input, Dropdown } from "reap-ui";

const overlay = (
    <Dropdown.Menu>
        <Dropdown.Item href="#">Action</Dropdown.Item>
        <Dropdown.Item href="#">Another action</Dropdown.Item>
        <Dropdown.Item href="#">Something else here</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item href="#">Separated link</Dropdown.Item>
    </Dropdown.Menu>
);

const button = (
    <Dropdown.Button
        outline
        variant="secondary"
        overlay={overlay}>
        Dropdown
        </Dropdown.Button>
);
const split = (
    <Dropdown.Button
        split
        outline
        variant="secondary"
        overlay={overlay}>
        Action
        </Dropdown.Button>
);

export default () => (
    <>
        <Input prepend={button} />
        <Input append={button} />
        <Input prepend={split} />
        <Input append={split} />
    </>
);
