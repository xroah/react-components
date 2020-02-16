import * as React from "react";
import { ListGroup } from "reap-ui";

const { Item } = ListGroup;

export default () => (
    <ListGroup>
        <Item>Dapibus ac facilisis in</Item>
        <Item variant="primary">A simple primary list group item</Item>
        <Item variant="secondary">A simple secondary list group item</Item>
        <Item variant="success">A simple success list group item</Item>
        <Item variant="danger">A simple danger list group item</Item>
        <Item variant="warning">A simple warning list group item</Item>
        <Item variant="info">A simple info list group item</Item>
        <Item variant="light">A simple light list group item</Item>
        <Item variant="dark">A simple dark list group item</Item>
    </ListGroup>
);