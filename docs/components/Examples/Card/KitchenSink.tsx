import * as React from "react"
import {
    Card, ListGroup
} from "reap-ui"
import imageCap from "../../../assets/image_cap.svg"

export default () => (
    <Card
        image={<Card.Image src={imageCap} />}
        style={{width: "18rem"}}>
        <Card.Body>
            <Card.Title>Card title</Card.Title>
            Some quick example text to build on the card title and make up the bulk of the card's content.
        </Card.Body>
        <ListGroup flush>
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
        </ListGroup>
        <Card.Body>
            <Card.Link href="#">Card link</Card.Link>
            <Card.Link href="#">Another link</Card.Link>
        </Card.Body>
    </Card>
)