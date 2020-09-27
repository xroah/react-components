import * as React from "react"
import {
    Nav, Dropdown 
} from "reap-ui"

const { Item, Link } = Nav
const overlay = (
    <Dropdown.Menu>
        <Dropdown.Item href="#">Action</Dropdown.Item>
        <Dropdown.Item href="#">Another action</Dropdown.Item>
        <Dropdown.Item href="#">Something else here</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item href="#">Separated link</Dropdown.Item>
    </Dropdown.Menu>
)
const dropdown = (
    <Dropdown overlay={overlay}>
        <Nav.Link href="#">Dropdown</Nav.Link>
    </Dropdown>
)

export default () => (
    <Nav variant="tab">
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
)