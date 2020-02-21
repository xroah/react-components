import * as React from "react";
import { Navbar, Nav, Form, Input, Button } from "reap-ui";

const {
    Brand,
    Collapse,
    Toggle
} = Navbar;
const {
    Item,
    Link
} = Nav;

export default () => (
    <>
        <Navbar variant="dark" bg="dark">
            <Brand href="#">Navbar</Brand>
            <Toggle />
            <Collapse>
                <Nav className="mr-auto">
                    <Item>
                        <Link href="#" active>Home</Link>
                    </Item>
                    <Item>
                        <Link href="#">Features</Link>
                    </Item>
                    <Item>
                        <Link href="#">Pricing</Link>
                    </Item>
                </Nav>
                <Form inline>
                    <Form.Item>
                        <Input className="mr-2" placeholder="search" />
                    </Form.Item>
                    <Form.Item>
                        <Button variant="info" outline>Search</Button>
                    </Form.Item>
                </Form>
            </Collapse>
        </Navbar>
        <Navbar variant="dark" bg="primary">
            <Brand href="#">Navbar</Brand>
            <Toggle />
            <Collapse>
                <Nav className="mr-auto">
                    <Item>
                        <Link href="#" active>Home</Link>
                    </Item>
                    <Item>
                        <Link href="#">Features</Link>
                    </Item>
                    <Item>
                        <Link href="#">Pricing</Link>
                    </Item>
                </Nav>
                <Form inline>
                    <Form.Item>
                        <Input className="mr-2" placeholder="search" />
                    </Form.Item>
                    <Form.Item>
                        <Button variant="light" outline>Search</Button>
                    </Form.Item>
                </Form>
            </Collapse>
        </Navbar>
        <Navbar variant="light" style={{ backgroundColor: "#e3f2fd" }}>
            <Brand href="#">Navbar</Brand>
            <Toggle />
            <Collapse>
                <Nav className="mr-auto">
                    <Item>
                        <Link href="#" active>Home</Link>
                    </Item>
                    <Item>
                        <Link href="#">Features</Link>
                    </Item>
                    <Item>
                        <Link href="#">Pricing</Link>
                    </Item>
                </Nav>
                <Form inline>
                    <Form.Item>
                        <Input className="mr-2" placeholder="search" />
                    </Form.Item>
                    <Form.Item>
                        <Button variant="primary" outline>Search</Button>
                    </Form.Item>
                </Form>
            </Collapse>
        </Navbar>
    </>
);