import * as React from "react";
import {
    HashRouter as Router,
} from "react-router-dom";
import { Row, Container } from "reap-ui";
import AppRouter from "./router";
import BackTop from "./components/BackTop";

export default () => (
    <Container variant="fluid">
        <BackTop />
        <Router>
            <Row>
                <AppRouter />
            </Row>
        </Router>
    </Container>
);
