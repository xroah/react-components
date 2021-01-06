import * as React from "react"
import {
    Container, Row, Col 
} from "reap-ui"

export default () => (
    <Container>
        <Row>
            <Col span={false} md={8}>
                col-md-8
            </Col>
            <Col span={6} md={4}>
               col-6 col-md-4
            </Col>
        </Row>
        <Row>
            <Col span={6} md={4}>
               col-6 col-md-4
            </Col>
            <Col span={6} md={4}>
               col-6 col-md-4
            </Col>
            <Col span={6} md={4}>
               col-6 col-md-4
            </Col>
        </Row>
    </Container>
)