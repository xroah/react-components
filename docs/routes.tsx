import { lazy } from "react"

export default [
    {
        path: "/components/alert",
        component: lazy(() => import("./Examples/Alert")),
        name: "Alert"
    },
    {
        path: "/components/badge",
        component: lazy(() => import("./Examples/Badge")),
        name: "Badge"
    },
    {
        path: "/components/breadcrumb",
        component: lazy(() => import("./Examples/Breadcrumb")),
        name: "Breadcrumb"
    },
    {
        path: "/components/button",
        component: lazy(() => import("./Examples/Button")),
        name: "Button"
    },
    {
        path: "/components/card",
        component: lazy(() => import("./Examples/Card")),
        name: "Card"
    },
    {
        path: "/components/carousel",
        component: lazy(() => import("./Examples/Carousel")),
        name: "Carousel"
    },
    {
        path: "/components/collapse",
        component: lazy(() => import("./Examples/Collapse")),
        name: "Collapse"
    },
    {
        path: "/components/dropdown",
        component: lazy(() => import("./Examples/Dropdown")),
        name: "Dropdown"
    },
    /*   {
          path: "/components/drawer",
          component: Drawer,
          name: "Drawer"
      }, */
    {
        path: "/components/form",
        component: lazy(() => import("./Examples/Form")),
        name: "Form"
    },

    {
        path: "/components/input",
        component: lazy(() => import("./Examples/Input")),
        name: "Input"
    },
    {
        path: "/components/jumbotron",
        component: lazy(() => import("./Examples/Jumbotron")),
        name: "Jumbotron"
    },
    {
        path: "/components/layout",
        component: lazy(() => import("./Examples/Layout")),
        name: "Layout"
    },
    {
        path: "/components/list-group",
        component: lazy(() => import("./Examples/ListGroup")),
        name: "ListGroup"
    },
    {
        path: "/components/media",
        component: lazy(() => import("./Examples/Media")),
        name: "Media"
    },
    {
        path: "/components/modal",
        component: lazy(() => import("./Examples/Modal")),
        name: "Modal"
    },
    {
        path: "/components/nav",
        component: lazy(() => import("./Examples/Nav")),
        name: "Nav"
    },
    {
        path: "/components/navbar",
        component: lazy(() => import("./Examples/Navbar")),
        name: "Navbar"
    },
    {
        path: "/components/pagination",
        component: lazy(() => import("./Examples/Pagination")),
        name: "Pagination"
    },
    {
        path: "/components/popover",
        component: lazy(() => import("./Examples/Popover")),
        name: "Popover"
    },
    {
        path: "/components/progress",
        component: lazy(() => import("./Examples/Progress")),
        name: "Progress"
    },
    {
        path: "/components/spinner",
        component: lazy(() => import("./Examples/Spinner")),
        name: "Spinner"
    },
    {
        path: "/components/tabs",
        component: lazy(() => import("./Examples/Tabs")),
        name: "Tabs"
    },
    {
        path: "/components/toast",
        component: lazy(() => import("./Examples/Toast")),
        name: "Toast"
    },
    {
        path: "/components/tooltip",
        component: lazy(() => import("./Examples/Tooltip")),
        name: "Tooltip"
    }
]
