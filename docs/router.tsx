import * as React from "react";
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { Col } from "reap-ui";
import Examples from "./examplesRouter";
import Home from "./components/Home";
import DocNav from "./components/DocNav";
import DrawerNav from "./components/DrawerNav";

export default () => (
    <Switch>
        <Route path="/components">
            <DrawerNav />
            <Col
                span={false}
                md={3}
                xl={2}
                className="d-none d-md-block">
                <DocNav />
            </Col>
            <Examples />
        </Route>
        <Route path="/" exact render={() => {
            document.title = "reap-ui--Bootstrap components built with React";

            return <Home/>;
        }} />
        <Redirect to="/" />
    </Switch>
);
