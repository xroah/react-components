import * as React from "react"
import {
    Form, Row, Col, Input, Checkbox, Button 
} from "reap-ui"

export default () => (
    <Form>
        <Row form>
            <Col md={{ span: 6 }}>
                <Form.Item labelText="Email">
                    <Input />
                </Form.Item>
            </Col>
            <Col md={{ span: 6 }}>
                <Form.Item labelText="Password">
                    <Input />
                </Form.Item>
            </Col>
        </Row>
        <Form.Item labelText="Address">
            <Input placeholder="1234 Main St" />
        </Form.Item>
        <Form.Item labelText="Address 2">
            <Input placeholder="Apartment, studio, or floor" />
        </Form.Item>
        <Row form>
            <Col md={{ span: 6 }}>
                <Form.Item labelText="City">
                    <Input />
                </Form.Item>
            </Col>
            <Col md={{ span: 4 }}>
                <Form.Item labelText="state" control>
                    <select>
                        <option>Choose...</option>
                        <option>...</option>
                    </select>
                </Form.Item>
            </Col>
            <Col md={{ span: 2 }}>
                <Form.Item labelText="Zip">
                    <Input />
                </Form.Item>
            </Col>
        </Row>
        <Form.Item>
            <Checkbox>Check me out</Checkbox>
        </Form.Item>
        <Button type="submit">Sign in</Button>
    </Form>
)