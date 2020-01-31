import * as React from "react";
import { Card, ListGroup } from "reap-ui";

export default () => (
    <Card header="Featured" style={{width: "18rem"}}>
        <ListGroup flush>
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
        </ListGroup>
    </Card>
);