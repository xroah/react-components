import * as React from "react";
import { Form, Row, Col, Input } from "reap-ui";

export default () => (
    <Form>
        <Row form>
            <Col>
                <Input placeholder="First name" />
            </Col>
            <Col>
                <Input placeholder="Last name" />
            </Col>
        </Row>
    </Form>
);