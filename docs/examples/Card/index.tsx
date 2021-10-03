import * as React from "react"
import Card from "reap-ui/Card"
import Button from "reap-ui/Button"

export default () => (
    <>
        <div className="mb-2 mt-2">
            <Card
                style={{width: "18rem"}}
                imgPosition="top"
                img={
                    <svg
                        className="bd-placeholder-img"
                        width="100%"
                        height="180" xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="xMidYMid slice" focusable="false">
                        <title>Placeholder</title>
                        <rect width="100%" height="100%" fill="#868e96"></rect>
                        <text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text>
                    </svg>
                }>
                <Card.Body>
                    <Card.Title subTitle="Card subtitle">Card title</Card.Title>
                    <p className="card-text">
                        Some quick example text to build on the card title and make up the bulk of the card's content.
                    </p>
                    <Button href="#">Go somewhere</Button>
                </Card.Body>
            </Card>
        </div>
        <div className="mb-2">
            <Card
                header="Card header"
                footer="Card footer"
                textAlignment="end"
                color="white"
                bg="success"
                borderColor="danger"
                style={{width: "18rem"}}>
                <Card.Body>
                    <Card.Title subTitle="Card subtitle">Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of the card's content.
                    </Card.Text>
                    <Card.Link href="#">Card link</Card.Link>
                    <Card.Link href="#">Another link</Card.Link>
                </Card.Body>
            </Card>
        </div>
        <div className="mb-2">
            <Card
                bg="dark"
                color="white"
                style={{width: "50rem"}}
                img={
                    <svg
                        className="bd-placeholder-img bd-placeholder-img-lg"
                        width="100%"
                        height="270"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="xMidYMid slice"
                        focusable="false">
                        <title>Placeholder</title>
                        <rect width="100%" height="100%" fill="#868e96"></rect>
                        <text x="50%" y="50%" fill="#dee2e6" dy=".3em">Card image</text>
                    </svg>
                }>
                    <Card.Body overlay>
                        <Card.Title>Card title</Card.Title>
                        <Card.Text>
                            This is a wider card with supporting text below as a natural lead-in to additional content.
                            This content is a little bit longer
                        </Card.Text>
                        <Card.Text>
                            <small>Last updated 3 mins ago</small>
                        </Card.Text>
                    </Card.Body>
            </Card>
        </div>
    </>
)