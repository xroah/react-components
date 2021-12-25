import * as React from "react"
import Navbar from "reap-ui/Navbar"
import BootstrapLogo from "../BootstrapLogo"
import Text from "reap-ui/Utilities/Text"
import Bg from "reap-ui/Utilities/Background"
import Container from "reap-ui/Layout/Container"
import Nav from "reap-ui/Nav"
import Collapse from "reap-ui/Collapse"

export default () => {
    const [open1, update1] = React.useState(false)
    const toggle1 = () => update1(!open1)
    const [open2, update2] = React.useState(false)
    const toggle2 = () => update2(!open2)

    return (
        <div className="my-3">
            <Text color="success" size={3}>
                <div className="my-2">Navbar</div>
            </Text>
            <Bg variant="light">
                <Navbar variant="light">
                    <Container fluid>
                        <Navbar.Brand>
                            <BootstrapLogo />
                            <span>Bootstrap</span>
                        </Navbar.Brand>
                    </Container>
                </Navbar>
            </Bg>
            <Bg variant="light">
                <Navbar
                    className="my-3"
                    variant="light"
                    expand="lg">
                    <Container fluid>
                        <Navbar.Toggler onClick={toggle1} />
                        <Navbar.Brand>
                            Navbar scroll
                        </Navbar.Brand>
                        <Navbar.Collapse open={open1}>
                            <Nav
                                navbar
                                scroll
                                className="my-2"
                                // @ts-ignore
                                style={{"--bs-scroll-height": "100px"}} >
                                <Nav.Item>
                                    <Nav.Link active>Home</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link>Link</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link>Link</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link disabled>Link</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </Bg>
            <div className="my-3">
                <Text color="danger" size={2}>
                    <div className="my-2">External content</div>
                </Text>
                <Collapse open={open2}>
                    <div>
                        <Bg variant="dark">
                            <div className="p-4">
                                <Text color="white">
                                    <h5 className="h4">
                                        Collapsed content
                                    </h5>
                                </Text>
                                <Text color="muted">
                                    <span>
                                        Toggleable via the navbar brand.
                                    </span>
                                </Text>
                            </div>
                        </Bg>
                    </div>
                </Collapse>
                <Bg variant="dark">
                    <Navbar variant="dark">
                        <Container fluid>
                            <Navbar.Toggler onClick={toggle2} />
                        </Container>
                    </Navbar>
                </Bg>
            </div>
        </div>
    )
}