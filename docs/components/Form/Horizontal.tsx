import * as React from "react";
import { Form, Input, Radio, Checkbox, Row, Col, Button } from "reap-ui";

export default () => (
    <Form
        horizontal
        labelCol={{ sm: { span: 2 } }}
        wrapperCol={{ sm: { span: 10 } }}>
        <Form.Item labelText="Email">
            <Input />
        </Form.Item>
        <Form.Item labelText="Password">
            <Input />
        </Form.Item>
        <Form.Item labelText="Radios">
            <Radio name="gridRadios">First radio</Radio>
            <Radio name="gridRadios">Second radio</Radio>
            <Radio name="gridRadios" disabled>Third disabled radio</Radio>
        </Form.Item>
        <Form.Item labelText="Checkbox" label={false}>
            <Checkbox>Example checkbox</Checkbox>
        </Form.Item>
        <Row form>
            <Col sm={{span: 10}}>
                <Button type="submit">Sign in</Button>
            </Col>
        </Row>
    </Form>
);