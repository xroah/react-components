import * as React from "react";
import { Jumbotron, Container } from "reap-ui";

export default () => (
    <Jumbotron fluid>
        <Container>
            <h1 className="display-4">Fluid jumbotron</h1>
            <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
        </Container>
    </Jumbotron>
);