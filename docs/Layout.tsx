import * as React from "react";
import {
    HashRouter as Router,
    Route
} from "react-router-dom";
import { Row, Col } from "reap-ui";
import DocNav from "./components/DocNav";
import DrawerNav from "./components/DrawerNav";
import AppRouter from "./router";
import BackTop from "./components/BackTop";

export default () => (
    <>
        <BackTop />
        <Router>
            <DrawerNav />
            <Row>
                <Col
                    span={false}
                    md={3}
                    className="d-none d-md-block">
                    <DocNav />
                </Col>
                <Col
                    span={false}
                    md={9}
                    className="pb-3">
                    <Route path="*">
                        <AppRouter />
                    </Route>
                </Col>
            </Row>
        </Router>
    </>
);
