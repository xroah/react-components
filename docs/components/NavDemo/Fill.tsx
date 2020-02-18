import * as React from "react";
import { Nav } from "reap-ui";

const { Item, Link } = Nav;

export default () => (
    <Nav variant="pill" fill>
        <Item>
            <Link active href="#">Active</Link>
        </Item>
        <Item>
            <Link href="#">Much longer nav link</Link>
        </Item>
        <Item>
            <Link href="#">Link</Link>
        </Item>
        <Item>
            <Link disabled href="#">Disabled</Link>
        </Item>
    </Nav>
);