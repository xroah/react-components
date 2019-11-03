import * as React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Alert from "./components/Alert";
import Nav from "./components/Nav";
import {Redirect} from "react-router";
import Badge from "./components/Badge";
import Breadcrumb from "./components/Breadcrumb";
import ButtonGroup from "./components/ButtonGroup";

export const ROUTES = [
    {
        path: "/components/alert",
        exact: true,
        component: Alert,
        name: "Alert"
    },
    {
        path: "/components/badge",
        exact: true,
        component: Badge,
        name: "Badge"
    },
    {
        path: "/components/breadcrumb",
        exact: true,
        component: Breadcrumb,
        name: "Breadcrumb"
    },
    {
        path: "/components/button-group",
        exact: true,
        component: ButtonGroup,
        name: "ButtonGroup"
    }
];

export default function AppRoute() {
    return (
        <Router>
            <div className="row">
                <Nav/>
                <main className="col-md-9 pb-3">
                    <Switch>
                        {
                            ROUTES.map(item => {
                                return (
                                    <Route
                                        key={item.path}
                                        path={item.path}
                                        exact={item.exact}
                                        component={item.component}/>
                                );
                            })
                        }
                        <Redirect to="/"/>
                    </Switch>
                </main>
            </div>
        </Router>
    );
}
