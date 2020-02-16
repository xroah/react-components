import * as React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Alert from "./components/Alert";
import Nav from "./components/Nav";
import Badge from "./components/Badge";
import Breadcrumb from "./components/Breadcrumb";
import Button from "./components/Button";
import Card from "./components/Card";
import Carousel from "./components/Carousel";
import Collapse from "./components/Collapse";
import Dropdown from "./components/Dropdown";
import Form from "./components/Form";
import Jumbotron from "./components/Jumbotron";
import Input from "./components/Input";
import ListGroup from "./components/ListGroup";
import Media from "./components/Media";
import Modal from "./components/Modal";
import Tooltip from "./components/Tooltip";
import Popover from "./components/Popover";

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
        path: "/components/input",
        component: Input,
        name: "Input"
    },
    {
        path: "/components/jumbotron",
        component: Jumbotron,
        name: "Jumbotron"
    },
    {
        path: "/components/list-group",
        component: ListGroup,
        name: "ListGroup"
    },
    {
        path: "/components/media",
        component: Media,
        name: "Media"
    },
    {
        path: "/components/modal",
        component: Modal,
        name: "Modal"
    },
    {
        path: "/components/popover",
        component: Popover,
        name: "Popover"
    },
    {
        path: "/components/tooltip",
        component: Tooltip,
        name: "Tooltip"
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
                                        exact
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
