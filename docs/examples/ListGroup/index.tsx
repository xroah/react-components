import * as React from "react"
import ListGroup from "reap-ui/ListGroup"

const {Item} = ListGroup

export default () => (
    <div style={{padding: 10}}>
        <div className="mb-2">
            <ListGroup>
                <Item>An item</Item>
                <Item>A second item</Item>
                <Item>A third item</Item>
                <Item>A fourth item</Item>
                <Item>And a fifth one</Item>
            </ListGroup>
        </div>
        <div className="mb-2">
            <ListGroup>
                <Item href="#" active>An active item</Item>
                <Item href="#" disabled>A disabled item</Item>
            </ListGroup>
        </div>
        <div className="mb-2">
            <ListGroup tag="div">
                <Item tag="button" actionable active>The current link item</Item>
                <Item tag="button" actionable disabled>A disabled link item</Item>
            </ListGroup>
        </div>
        <div className="mb-2">
            <ListGroup flush>
                <Item>An item</Item>
                <Item>A second item</Item>
                <Item>A third item</Item>
                <Item>A fourth item</Item>
                <Item>And a fifth one</Item>
            </ListGroup>
        </div>
        <div className="mb-2">
            <ListGroup numbered horizontal>
                <Item variant="primary">A list item</Item>
                <Item variant="info">A list item</Item>
                <Item variant="danger">A list item</Item>
            </ListGroup>
        </div>
    </div>
)