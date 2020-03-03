import * as React from "react";
import { Popover, Button, Row, Col } from "reap-ui";

const CONTENT = "Vivamus sagittis lacus vel augue laoreet rutrum faucibus.";

export default () => (
    <Row>
        <Col className="mb-3">
            <Popover placement="top" content={CONTENT}>
                <Button variant="secondary">Popover on top</Button>
            </Popover>
        </Col>
        <Col className="mb-3">
            <Popover content={CONTENT}>
                <Button variant="secondary">Popover on right</Button>
            </Popover>
        </Col>
        <Col className="mb-3">
            <Popover placement="bottom" content={CONTENT}>
                <Button variant="secondary">Popover on bottom</Button>
            </Popover>
        </Col>
        <Col className="mb-3">
            <Popover placement="left" content={CONTENT}>
                <Button variant="secondary">Popover on left</Button>
            </Popover>
        </Col>
    </Row>
);