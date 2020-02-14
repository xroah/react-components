import * as React from "react";
import { Input, Dropdown } from "reap-ui";

const overlay = (
    <Dropdown.Menu>
        <Dropdown.MenuItem href="#">Action</Dropdown.MenuItem>
        <Dropdown.MenuItem href="#">Another action</Dropdown.MenuItem>
        <Dropdown.MenuItem href="#">Something else here</Dropdown.MenuItem>
        <Dropdown.Divider />
        <Dropdown.MenuItem href="#">Separated link</Dropdown.MenuItem>
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
