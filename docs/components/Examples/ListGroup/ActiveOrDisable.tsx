import * as React from "react";
import { ListGroup } from "reap-ui";

const { Item } = ListGroup;

export default () => (
    <ListGroup>
        <Item active>Cras justo odio</Item>
        <Item disabled>Dapibus ac facilisis in</Item>
        <Item>Morbi leo risus</Item>
        <Item>Porta ac consectetur ac</Item>
        <Item>Vestibulum at eros</Item>
    </ListGroup>
);