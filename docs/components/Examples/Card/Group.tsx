import * as React from "react"
import { Card } from "reap-ui"
import img from "../../../assets/image_cap.svg"

export default () => (
    <Card.Group>
        <Card img={img} body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
                This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
            </Card.Text>
            <Card.Text>
                <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Text>
        </Card>
        <Card img={img} body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
                This card has supporting text below as a natural lead-in to additional content.
            </Card.Text>
            <Card.Text>
                <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Text>
        </Card>
        <Card img={img} body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
                This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.
            </Card.Text>
            <Card.Text>
                <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Text>
        </Card>
    </Card.Group>
)