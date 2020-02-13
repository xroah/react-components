import * as React from "react";
import { Form, Row, Col, Input } from "reap-ui";

export default () => (
    <Form>
        <Row>
            <Col>
                <Form.Item>
                    <Input placeholder="First name"/>
                </Form.Item>
            </Col>
            <Col>
                <Form.Item>
                    <Input placeholder="Last name"/>
                </Form.Item>
            </Col>
        </Row>
    </Form>
);