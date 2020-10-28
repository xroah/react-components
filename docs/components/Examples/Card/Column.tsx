import * as React from "react"
import {Card} from "reap-ui"
import img from "../../../assets/image_cap.svg"

export default () => (
    <Card.Columns>
        <Card image={<Card.Image src={img} />} body>
            <Card.Title>Card title that wraps to a new line</Card.Title>
            <Card.Text>
                This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
            </Card.Text>
        </Card>
        <Card body>
            <Card.Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
            </Card.Text>
            <Card.Text>
                <small className="text-muted">
                    Someone famous in <cite title="Source Title">Source Title</cite>
                </small>
            </Card.Text>
        </Card>
        <Card image={<Card.Image src={img} />} body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
                This card has supporting text below as a natural lead-in to additional content.
            </Card.Text>
            <Card.Text>
                <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Text>
        </Card>
        <Card alignment="center" bg="primary" color="white" body>
            <Card.Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat.
            </Card.Text>
            <Card.Text>
                <small>
                    Someone famous in <cite title="Source Title">Source Title</cite>
                </small>
            </Card.Text>
        </Card>
        <Card alignment="center" body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
                This card has a regular title and short paragraphy of text below it.
            </Card.Text>
            <Card.Text>
                <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Text>
        </Card>
        <Card image={<Card.Image src={img} />} />
        <Card alignment="right" body>
            <Card.Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat.
            </Card.Text>
            <Card.Text>
                <small>
                    Someone famous in <cite title="Source Title">Source Title</cite>
                </small>
            </Card.Text>
        </Card>
        <Card body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
                This card has a regular title and short paragraphy of text below it.
            </Card.Text>
            <Card.Text>
                <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Text>
        </Card>
    </Card.Columns>
)