import * as React from "react"
import Nav from "reap-ui/Nav"
import Flex from "reap-ui/Utilities/Flex"

const getEl = (props: any = {}) => (
    <Nav className="my-3" {...props}>
        <Nav.Item>
            <Nav.Link active>Active</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link>Link</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link>Link</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link disabled>Disabled</Nav.Link>
        </Nav.Item>
    </Nav>
)

export default () => (
    <div className="my-3">
        {getEl()}
        <Flex.Alignment horizontal="center">
            {getEl()}
        </Flex.Alignment>
        <Flex direction="column">
            {getEl()}
        </Flex>
        {getEl({variant: "tabs"})}
        {getEl({
            variant: "pills",
            fill: true,
            justify: true
        })}
    </div>
)