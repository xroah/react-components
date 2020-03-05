import * as React from "react";
import loadable from "@loadable/component";
import Loading from "./components/Loading";

const options = { fallback: <Loading /> };

export default [
    {
        path: "/components/alert",
        component: loadable(() => import("./components/Examples/Alert"), options),
        name: "Alert"
    },
    {
        path: "/components/badge",
        component: loadable(() => import("./components/Examples/Badge"), options),
        name: "Badge"
    },
    {
        path: "/components/breadcrumb",
        component: loadable(() => import("./components/Examples/Breadcrumb"), options),
        name: "Breadcrumb"
    },
    {
        path: "/components/button",
        component: loadable(() => import("./components/Examples/Button"), options),
        name: "Button"
    },
    {
        path: "/components/card",
        component: loadable(() => import("./components/Examples/Card"), options),
        name: "Card"
    },
    {
        path: "/components/carousel",
        component: loadable(() => import("./components/Examples/Carousel"), options),
        name: "Carousel"
    },
    {
        path: "/components/collapse",
        component: loadable(() => import("./components/Examples/Collapse"), options),
        name: "Collapse"
    },
    {
        path: "/components/dropdown",
        component: loadable(() => import("./components/Examples/Dropdown"), options),
        name: "Dropdown"
    },
    /*   {
          path: "/components/drawer",
          component: Drawer,
          name: "Drawer"
      }, */
    {
        path: "/components/form",
        component: loadable(() => import("./components/Examples/Form"), options),
        name: "Form"
    },

    {
        path: "/components/input",
        component: loadable(() => import("./components/Examples/Input"), options),
        name: "Input"
    },
    {
        path: "/components/jumbotron",
        component: loadable(() => import("./components/Examples/Jumbotron"), options),
        name: "Jumbotron"
    },
    {
        path: "/components/list-group",
        component: loadable(() => import("./components/Examples/ListGroup"), options),
        name: "ListGroup"
    },
    {
        path: "/components/media",
        component: loadable(() => import("./components/Examples/Media"), options),
        name: "Media"
    },
    {
        path: "/components/modal",
        component: loadable(() => import("./components/Examples/Modal"), options),
        name: "Modal"
    },
    {
        path: "/components/nav",
        component: loadable(() => import("./components/Examples/Nav"), options),
        name: "Nav"
    },
    {
        path: "/components/navbar",
        component: loadable(() => import("./components/Examples/Navbar"), options),
        name: "Navbar"
    },
    {
        path: "/components/pagination",
        component: loadable(() => import("./components/Examples/Pagination"), options),
        name: "Pagination"
    },
    {
        path: "/components/popover",
        component: loadable(() => import("./components/Examples/Popover"), options),
        name: "Popover"
    },
    {
        path: "/components/progress",
        component: loadable(() => import("./components/Examples/Progress"), options),
        name: "Progress"
    },
    {
        path: "/components/spinner",
        component: loadable(() => import("./components/Examples/Spinner"), options),
        name: "Spinner"
    },
    {
        path: "/components/tabs",
        component: loadable(() => import("./components/Examples/Tabs"), options),
        name: "Tabs"
    },
    {
        path: "/components/toast",
        component: loadable(() => import("./components/Examples/Toast"), options),
        name: "Toast"
    },
    {
        path: "/components/tooltip",
        component: loadable(() => import("./components/Examples/Tooltip"), options),
        name: "Tooltip"
    }
];
