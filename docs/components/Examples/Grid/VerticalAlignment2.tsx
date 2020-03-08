import * as React from "react";
import { Container, Row, Col } from "reap-ui";

export default () => (
    <Container>
        <Row className="bg-secondary" style={{ minHeight: 150 }}>
            <Col alignment="start">
                One of three columns
            </Col>
            <Col alignment="center">
                One of three columns
            </Col>
            <Col alignment="end">
                One of three columns
            </Col>
        </Row>
    </Container>
);