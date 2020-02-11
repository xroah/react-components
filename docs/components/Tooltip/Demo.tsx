import * as React from "react";
import { Tooltip, Button, Row, Col } from "reap-ui";

export default () => (
    <Row>
        <Col className="mb-3">
            <Tooltip text={"Tooltip on top"}>
                <Button variant="secondary">Tooltip on top</Button>
            </Tooltip>
        </Col>
        <Col>
            <Tooltip text="Tooltip on right" placement="right">
                <Button variant="secondary">Tooltip on right</Button>
            </Tooltip>
        </Col>
        <Col className="mb-3">
            <Tooltip text="Tooltip on bottom" placement="bottom">
                <Button variant="secondary">Tooltip on bottom</Button>
            </Tooltip>
        </Col>
        <Col className="mb-3">
            <Tooltip text="Tooltip on left" placement="left">
                <Button variant="secondary">Tooltip on left</Button>
            </Tooltip>
        </Col>
    </Row>
);