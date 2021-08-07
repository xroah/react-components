import * as React from "react"
import Card from "reap-ui/Card"
import Button from "reap-ui/Button"

export default () => (
    <>
        <div className="mb-2 mt-2">
            <Card
                style={{width: "18rem"}}
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
    </>
)