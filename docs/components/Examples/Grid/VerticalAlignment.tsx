import * as React from "react";
import { Container, Row, Col } from "reap-ui";

export default () => (
    <Container>
        <Row
            alignment="start"
            className="bg-secondary"
            style={{ minHeight: 150 }}>
            <Col>
                One of three columns
            </Col>
            <Col>
                One of three columns
            </Col>
            <Col>
                One of three columns
            </Col>
        </Row>
        <Row
            alignment="center"
            className="bg-secondary"
            style={{ minHeight: 150 }}>
            <Col>
                One of three columns
            </Col>
            <Col>
                One of three columns
            </Col>
            <Col>
                One of three columns
            </Col>
        </Row>
        <Row
            alignment="end"
            className="bg-secondary"
            style={{ minHeight: 150 }}>
            <Col>
                One of three columns
            </Col>
            <Col>
                One of three columns
            </Col>
            <Col>
                One of three columns
            </Col>
        </Row>
    </Container>
);