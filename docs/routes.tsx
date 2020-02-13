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
import Button from "./components/Button";
import Card from "./components/Card";
import Carousel from "./components/Carousel";
import Collapse from "./components/Collapse";
import Dropdown from "./components/Dropdown";
import Tooltip from "./components/Tooltip";
import Popover from "./components/Popover";
import Form from "./components/Form";

export const ROUTES = [
    {
        path: "/components/alert",
        component: Alert,
        name: "Alert"
    },
    {
        path: "/components/badge",
        component: Badge,
        name: "Badge"
    },
    {
        path: "/components/breadcrumb",
        component: Breadcrumb,
        name: "Breadcrumb"
    },
    {
        path: "/components/button",
        component: Button,
        name: "Button"
    },
    {
        path: "/components/card",
        component: Card,
        name: "Card"
    },
    {
        path: "/components/carousel",
        component: Carousel,
        name: "Carousel"
    },
    {
        path: "/components/collapse",
        component: Collapse,
        name: "Collapse"
    },
    {
        path: "/components/dropdown",
        component: Dropdown,
        name: "Dropdown"
    },
    {
        path: "/components/form",
        component: Form,
        name: "Form"
    },
    {
        path: "/components/tooltip",
        component: Tooltip,
        name: "Tooltip"
    },
    {
        path: "/components/popover",
        component: Popover,
        name: "Popover"
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
                                        exact={true}
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
