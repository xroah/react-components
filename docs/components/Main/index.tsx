import * as React from "react";
import { Col } from "reap-ui";

export default (props: { children?: React.ReactNode }) => (
    <Col
        span={false}
        md={9}
        xl={8}
        className="pb-3">
        {props.children}
    </Col>
);