import * as React from "react"
import { Card } from "reap-ui"

export default () => (
    <Card body style={{width: "18rem"}}>
        <Card.Title subtitle="Card subtitle">CardTitle</Card.Title>
        <Card.Text>
            Some quick example text to build on the card title and make up the bulk of the card's content.
        </Card.Text>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
    </Card>
)