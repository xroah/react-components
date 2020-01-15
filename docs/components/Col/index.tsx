import * as React from "react";
import {Row, Col} from "reap-ui";

export default () => {
    return (
        <>
            <Row>
                <Col span={3} sm={true}>
                    <div className="bg-primary">col1</div>
                </Col>
                <Col span={8} sm={{ span: 6 }}>
                    <div className="bg-primary">col2</div>
                </Col>
                <Col>
                    <div className="bg-primary">col3</div>
                </Col>
            </Row>
            <Row>
                <Col offset={3}>
                    <div className="bg-secondary">offset 3</div>
                </Col>
            </Row>
            <Row>
                <Col order={2}>
                    <div className="bg-secondary">First column</div>
                </Col>
                <Col order={1}>
                    <div className="bg-secondary">Second column</div>
                </Col>
                <Col order={4}>
                    <div className="bg-secondary">Third column</div>
                </Col>
            </Row>
        </>
    );
}