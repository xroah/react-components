import * as React from "react";
import { ListGroup, Button } from "reap-ui";

const { Item } = ListGroup;

export default () => {
    const [active, updateActive] = React.useState(false);
    const handleActive = () => updateActive(!active);

    return (
        <>
            <div className="mb-3">
                <Button onClick={handleActive}>Toggle active</Button>
            </div>
            <ListGroup>
                <Item active={active} action>Dapibus ac facilisis in</Item>
                <Item active={active} action variant="primary">A simple primary list group item</Item>
                <Item active={active} action variant="secondary">A simple secondary list group item</Item>
                <Item active={active} action variant="success">A simple success list group item</Item>
                <Item active={active} action variant="danger">A simple danger list group item</Item>
                <Item active={active} action variant="warning">A simple warning list group item</Item>
                <Item active={active} action variant="info">A simple info list group item</Item>
                <Item active={active} action variant="light">A simple light list group item</Item>
                <Item active={active} action variant="dark">A simple dark list group item</Item>
            </ListGroup>
        </>
    );
};