import * as React from "react";
import { Container, Row, Col } from "reap-ui";

export default () => (
    <Container>
        <Row>
            <Col span={false} md={4}>
                col-md-4
            </Col>
            <Col span={false} md={{ span: 4, offset: 4 }}>
                col-md-4 offset-md-4
            </Col>
        </Row>
        <Row>
            <Col span={false} md={4}>
                col-md-4
            </Col>
            <Col span={false} md={{ span: 4, offset: 4 }}>
                col-md-4 offset-md-4
            </Col>
        </Row>
        <Row>
            <Col span={false} md={{ span: 3, offset: 3 }}>
                col-md-3 offset-md-3
            </Col>
            <Col span={false} md={{ span: 3, offset: 3 }}>
                col-md-3 offset-md-3
            </Col>
        </Row>
        <Row>
            <Col span={false} md={{ span: 6, offset: 3 }}>
                col-md-6 offset-md-3
            </Col>
        </Row>
    </Container>
);