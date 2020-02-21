import * as React from "react";
import { Dropdown, Row, Col } from "reap-ui";

export default () => {
    const overlay = (
        <Dropdown.Menu>
            <Dropdown.Item href="#">Action</Dropdown.Item>
            <Dropdown.Item href="#">Another action</Dropdown.Item>
            <Dropdown.Item href="#">Something else here</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="#">Separated link</Dropdown.Item>
        </Dropdown.Menu>
    );

    return (
        <>
            <Row>
                <Col className="mb-3">
                    <Dropdown.Button
                        size="lg"
                        variant="secondary"
                        overlay={overlay}>
                        Large button
                    </Dropdown.Button>
                </Col>
                <Col className="mb-3">
                    <Dropdown.Button
                        split
                        size="lg"
                        variant="secondary"
                        overlay={overlay}>
                        Large split button
                    </Dropdown.Button>
                </Col>
            </Row>
            <Row>
                <Col className="mb-3">
                    <Dropdown.Button
                        size="sm"
                        variant="secondary"
                        overlay={overlay}>
                        Small button
                    </Dropdown.Button>
                </Col>
                <Col className="mb-3">
                    <Dropdown.Button
                        split
                        size="sm"
                        variant="secondary"
                        overlay={overlay}>
                        Small split button
                    </Dropdown.Button>
                </Col>
            </Row>
        </>
    )
};