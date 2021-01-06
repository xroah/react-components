import * as React from "react"
import { ListGroup } from "reap-ui"

const { Item } = ListGroup

export default () => (
    <ListGroup>
        <Item action href="#">Link</Item>
        <Item action >This is a button</Item>
    </ListGroup>
)