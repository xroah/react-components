import * as React from "react"
import {
    Navbar, Nav, Dropdown, Form, Input, Button 
} from "reap-ui"

const {
    Brand,
    Collapse,
    Toggle
} = Navbar
const {
    Link,
    Item
} = Nav
const {
    Menu,
    Item: MenuItem,
    Divider
} = Dropdown

export default () => {
    const [isOpen, toggleOpen] = React.useState(false)
    const toggle = () => toggleOpen(!isOpen)
    const overlay = (
        <Menu>
            <MenuItem href="#">Action</MenuItem>
            <MenuItem href="#">Another action</MenuItem>
            <Divider />
            <MenuItem href="#">Something else here</MenuItem>
        </Menu>
    )

    return (
        <>
            <Navbar
                expand="lg"
                bg="light">
                <Brand href="#">Navbar</Brand>
                <Toggle onClick={toggle} />
                <Collapse isOpen={isOpen}>
                    <Nav className="mr-auto">
                        <Item>
                            <Link active href="#">Home</Link>
                        </Item>
                        <Item>
                            <Link href="#">Link</Link>
                        </Item>
                        <Item>
                            <Link href="#">Link</Link>
                        </Item>
                        <Item>
                            <Dropdown overlay={overlay}>
                                <Link href="#">Dropdown</Link>
                            </Dropdown>
                        </Item>
                        <Item>
                            <Link disabled href="#">Disabled</Link>
                        </Item>
                    </Nav>
                    <Form inline>
                        <Form.Item className="mr-sm-2">
                            <Input placeholder="Search" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="submit" variant="success" outline>Search</Button>
                        </Form.Item>
                    </Form>
                </Collapse>
            </Navbar>
        </>
    )
}