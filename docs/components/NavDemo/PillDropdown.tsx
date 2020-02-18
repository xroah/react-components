import * as React from "react";
import { Nav, Dropdown } from "reap-ui";

const { Item, Link } = Nav;
const overlay = (
    <Dropdown.Menu>
        <Dropdown.MenuItem href="#">Action</Dropdown.MenuItem>
        <Dropdown.MenuItem href="#">Another action</Dropdown.MenuItem>
        <Dropdown.MenuItem href="#">Something else here</Dropdown.MenuItem>
        <Dropdown.Divider />
        <Dropdown.MenuItem href="#">Separated link</Dropdown.MenuItem>
    </Dropdown.Menu>
);
const dropdown = (
    <Dropdown overlay={overlay}>
        <Nav.Link href="#">Dropdown</Nav.Link>
    </Dropdown>
);

export default () => (
    <Nav variant="pill">
        <Item>
            <Link active href="#">Active</Link>
        </Item>
        <Item>
            {dropdown}
        </Item>
        <Item>
            <Link href="#">Link</Link>
        </Item>
        <Item>
            <Link disabled href="#">Disabled</Link>
        </Item>
    </Nav>
);