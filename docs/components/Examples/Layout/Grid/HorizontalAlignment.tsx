import * as React from "react";
import { Container, Row, Col } from "reap-ui";

export default () => (
    <Container>
        <Row justify="start">
            <Col span={4}>
                One of two columns
            </Col>
            <Col span={4}>
                One of two columns
            </Col>
        </Row>
        <Row justify="center">
            <Col span={4}>
                One of two columns
            </Col>
            <Col span={4}>
                One of two columns
            </Col>
        </Row>
        <Row justify="end">
            <Col span={4}>
                One of two columns
            </Col>
            <Col span={4}>
                One of two columns
            </Col>
        </Row>
        <Row justify="around">
            <Col span={4}>
                One of two columns
            </Col>
            <Col span={4}>
                One of two columns
            </Col>
        </Row>
        <Row justify="between">
            <Col span={4}>
                One of two columns
            </Col>
            <Col span={4}>
                One of two columns
            </Col>
        </Row>
    </Container>
);