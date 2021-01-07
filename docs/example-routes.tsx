import { lazy } from "react"

export default [
    {
        path: "/components/alert",
        component: lazy(() => import("./examples/Alert")),
        name: "Alert"
    },
    {
        path: "/components/badge",
        component: lazy(() => import("./examples/Badge")),
        name: "Badge"
    },
    {
        path: "/components/breadcrumb",
        component: lazy(() => import("./examples/Breadcrumb")),
        name: "Breadcrumb"
    },
    {
        path: "/components/button",
        component: lazy(() => import("./examples/Button")),
        name: "Button"
    },
    {
        path: "/components/card",
        component: lazy(() => import("./examples/Card")),
        name: "Card"
    },
    {
        path: "/components/carousel",
        component: lazy(() => import("./examples/Carousel")),
        name: "Carousel"
    },
    {
        path: "/components/collapse",
        component: lazy(() => import("./examples/Collapse")),
        name: "Collapse"
    },
    {
        path: "/components/dropdown",
        component: lazy(() => import("./examples/Dropdown")),
        name: "Dropdown"
    },
    /*   {
          path: "/components/drawer",
          component: Drawer,
          name: "Drawer"
      }, */
    {
        path: "/components/form",
        component: lazy(() => import("./examples/Form")),
        name: "Form"
    },

    {
        path: "/components/input",
        component: lazy(() => import("./examples/Input")),
        name: "Input"
    },
    {
        path: "/components/jumbotron",
        component: lazy(() => import("./examples/Jumbotron")),
        name: "Jumbotron"
    },
    {
        path: "/components/layout",
        component: lazy(() => import("./examples/Layout")),
        name: "Layout"
    },
    {
        path: "/components/list-group",
        component: lazy(() => import("./examples/ListGroup")),
        name: "ListGroup"
    },
    {
        path: "/components/media",
        component: lazy(() => import("./examples/Media")),
        name: "Media"
    },
    {
        path: "/components/modal",
        component: lazy(() => import("./examples/Modal")),
        name: "Modal"
    },
    {
        path: "/components/nav",
        component: lazy(() => import("./examples/Nav")),
        name: "Nav"
    },
    {
        path: "/components/navbar",
        component: lazy(() => import("./examples/Navbar")),
        name: "Navbar"
    },
    {
        path: "/components/pagination",
        component: lazy(() => import("./examples/Pagination")),
        name: "Pagination"
    },
    {
        path: "/components/popover",
        component: lazy(() => import("./examples/Popover")),
        name: "Popover"
    },
    {
        path: "/components/progress",
        component: lazy(() => import("./examples/Progress")),
        name: "Progress"
    },
    {
        path: "/components/spinner",
        component: lazy(() => import("./examples/Spinner")),
        name: "Spinner"
    },
    {
        path: "/components/tabs",
        component: lazy(() => import("./examples/Tabs")),
        name: "Tabs"
    },
    {
        path: "/components/toast",
        component: lazy(() => import("./examples/Toast")),
        name: "Toast"
    },
    {
        path: "/components/tooltip",
        component: lazy(() => import("./examples/Tooltip")),
        name: "Tooltip"
    }
]
