import * as React from "react";
import { Container, Row, Col } from "reap-ui";

export default () => (
    <Container>
        <Row cols={4}>
            <Col>Column</Col>
            <Col>Column</Col>
            <Col span={6}>Column</Col>
            <Col>Column</Col>
        </Row>
    </Container>
);