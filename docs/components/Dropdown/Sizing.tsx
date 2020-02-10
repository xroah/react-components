import * as React from "react";
import { Dropdown, Row, Col } from "reap-ui";

export default () => {
    const overlay = (
        <Dropdown.Menu>
            <Dropdown.MenuItem href="#">Action</Dropdown.MenuItem>
            <Dropdown.MenuItem href="#">Another action</Dropdown.MenuItem>
            <Dropdown.MenuItem href="#">Something else here</Dropdown.MenuItem>
            <Dropdown.Divider />
            <Dropdown.MenuItem href="#">Separated link</Dropdown.MenuItem>
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