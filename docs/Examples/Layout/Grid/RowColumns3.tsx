import * as React from "react"
import {
    Container, Row, Col 
} from "reap-ui"

export default () => (
    <Container>
        <Row cols={{
            default: 1,
            sm: 2,
            md: 4
        }}>
            <Col>Column</Col>
            <Col>Column</Col>
            <Col>Column</Col>
            <Col>Column</Col>
        </Row>
    </Container>
)