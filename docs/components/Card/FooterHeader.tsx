import * as React from "react";
import { Card, Button } from "reap-ui";

export default () => (
    <Card
        header={<h5>Featured</h5>}
        footer="2 days ago"
        body
        align="center">
        <Card.Title>Special title treatment</Card.Title>
        <Card.Text>With supporting text below as a natural lead-in to additional content.</Card.Text>
        <Button href="#">Go somewhere</Button>
    </Card>
);