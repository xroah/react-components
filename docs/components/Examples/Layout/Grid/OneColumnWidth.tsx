import * as React from "react";
import { Container, Row, Col } from "reap-ui";

export default () => (
    <Container>
        <Row>
            <Col>
                1 of 3
            </Col>
            <Col span={6}>
                2 of 3(wider)
            </Col>
            <Col>
                3 of 3
            </Col>
        </Row>
        <Row>
            <Col>
                1 of 3
            </Col>
            <Col span={5}>
                2 of 3(wider)
            </Col>
            <Col>
                3 of 3
            </Col>
        </Row>
    </Container>
);