import * as React from "react";
import { Card } from "reap-ui";

const svg = (
    <svg style={{textAnchor: "middle"}} width="100%" height="270" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#868e96"></rect><text x="50%" y="50%" fill="#dee2e6" dy=".3em" fontSize="30px">Card image</text></svg>
);

export default () => (
    <Card color="white" bg="dark" isImgOverlay img={svg}>
        <Card.Title>Card title</Card.Title>
        <Card.Text>
            This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
        </Card.Text>
        <Card.Text>
            <small>Last updated 3 mins ago</small>
        </Card.Text>
    </Card>
);