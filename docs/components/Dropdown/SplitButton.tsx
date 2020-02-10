import * as React from "react";
import { Dropdown } from "reap-ui";

export default () => {
    const overlay = (
        <Dropdown.Menu header="Dropdown header">
            <Dropdown.MenuItem href="#" active>Action</Dropdown.MenuItem>
            <Dropdown.MenuItem href="#" disabled>Another action</Dropdown.MenuItem>
            <Dropdown.MenuItem href="#">Something else here</Dropdown.MenuItem>
        </Dropdown.Menu>
    );

    return (
        <Dropdown.Button
            split
            variant="secondary"
            overlay={overlay}>
            Split button
    </Dropdown.Button>
    )
};