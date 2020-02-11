import * as React from "react";
import { Dropdown } from "reap-ui";

export default () => {
    const overlay = (
        <Dropdown.Menu>
            <Dropdown.MenuItem href="#">Action</Dropdown.MenuItem>
            <Dropdown.MenuItem href="#">Another action</Dropdown.MenuItem>
            <Dropdown.MenuItem href="#">Something else here</Dropdown.MenuItem>
        </Dropdown.Menu>
    );

    return (
        <Dropdown.Button
            variant="secondary"
            overlay={overlay}>
            Dropdown button
        </Dropdown.Button>
    )
};