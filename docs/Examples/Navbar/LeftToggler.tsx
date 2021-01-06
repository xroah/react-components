import * as React from "react"
import {
    Navbar, Nav, Form, Input, Button 
} from "reap-ui"

const {
    Brand,
    Collapse,
    Toggle
} = Navbar
const {
    Item,
    Link
} = Nav

export default () => (
    <>
        <Navbar expand="lg" bg="light">
            <Brand href="#">Navbar</Brand>
            <Toggle />
            <Collapse>
                <Nav className="mr-auto">
                    <Item>
                        <Link href="#" active>Home</Link>
                    </Item>
                    <Item>
                        <Link href="#">Link</Link>
                    </Item>
                    <Item>
                        <Link href="#" disabled>Disabled</Link>
                    </Item>
                </Nav>
                <Form inline>
                    <Form.Item>
                        <Input className="mr-2" placeholder="search" />
                    </Form.Item>
                    <Form.Item>
                        <Button variant="success" outline>Search</Button>
                    </Form.Item>
                </Form>
            </Collapse>
        </Navbar>
    </>
)