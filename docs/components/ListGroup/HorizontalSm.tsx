import * as React from "react";
import { ListGroup } from "reap-ui";

const { Item } = ListGroup;

export default () => (
    <ListGroup horizontal minWidth="sm">
        <Item equalWidth>Cras justo odio</Item>
        <Item equalWidth>Dapibus ac facilisis in</Item>
        <Item equalWidth>Morbi leo risus</Item>
    </ListGroup>
);