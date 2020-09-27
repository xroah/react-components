import * as React from "react"
import { ListGroup } from "reap-ui"

const { Item } = ListGroup

export default () => (
    <ListGroup horizontal minWidth="lg" equalWidth>
        <Item>Cras justo odio</Item>
        <Item>Dapibus ac facilisis in</Item>
        <Item>Morbi leo risus</Item>
    </ListGroup>
)