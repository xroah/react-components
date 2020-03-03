import * as React from "react";
import { Nav } from "reap-ui";

const { Item, Link } = Nav;

export default () => (
    <Nav variant="pill">
        <Link active href="#">Active</Link>
        <Link href="#">Link</Link>
        <Link href="#">Link</Link>
        <Link disabled href="#">Disabled</Link>
    </Nav>
);