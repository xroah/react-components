import * as React from "react"
import {
    Card,
    Image,
    Button
} from "reap-ui"
import img from "../../assets/card_img.svg"

export default () => (
    <Card
        body
        style={{width: "18rem"}}
        image={<Image src={img} />}>
        <Card.Title>Card title</Card.Title>
        <Card.Text>
            Some quick example text to build on the card title and make up the bulk of the card's content.
        </Card.Text>
        <Button href="#">Go somewhere</Button>
    </Card>
)