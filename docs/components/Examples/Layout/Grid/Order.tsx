import * as React from "react"
import {
    Container, Row, Col 
} from "reap-ui"

export default () => (
    <Container>
        <Row>
            <Col>
            First in DOM, no order applied
            </Col>
            <Col order={12}>
            Second in DOM, with a larger order
            </Col>
            <Col order={1}>
            Third in DOM, with an order of 1
            </Col>
        </Row>
    </Container>
)