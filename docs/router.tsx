import * as React from "react";
import {
    HashRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { Row, Col } from "reap-ui";
import DocNav from "./components/DocNav";
import DrawerNav from "./components/DrawerNav";
import routes from "./routes";

export default function AppRoute() {
    return (
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
                    <Switch>
                        {
                            routes.map(item => {
                                return (
                                    <Route
                                        key={item.path}
                                        path={item.path}
                                        exact
                                        component={item.component} />
                                );
                            })
                        }
                        <Redirect to="/" />
                    </Switch>
                </Col>
            </Row>
        </Router>
    );
}
