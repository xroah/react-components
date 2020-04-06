import * as React from "react";
import { Container, Row, Col } from "reap-ui";

export default () => (
    <Container>
        <Row justify="center">
            <Col lg={2}>
                1 of 3
            </Col>
            <Col span={false} md="auto">
            Variable width content
            </Col>
            <Col lg={2}>
                3 of 3
            </Col>
        </Row>
        <Row>
            <Col>
                1 of 3
            </Col>
            <Col span={false} md="auto">
            Variable width content
            </Col>
            <Col lg={2}>
                3 of 3
            </Col>
        </Row>
    </Container>
);