import * as React from "react";
import {
    HashRouter as Router,
} from "react-router-dom";
import { Row, Container } from "reap-ui";
import AppRouter from "./router";
import BackTop from "./components/BackTop";
import Header from "./components/Header";
import Language from "./components/Language";

export default () => (
    <Language>
        <Router>
            <Header />
            <Container variant="fluid">
                <BackTop />
                <Row>
                    <AppRouter />
                </Row>
            </Container>
        </Router>
    </Language>
);