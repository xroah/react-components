import { lazy } from "react"

export default [
    {
        path: "/components/alert",
        component: lazy(() => import("./components/Examples/Alert")),
        name: "Alert"
    },
    {
        path: "/components/badge",
        component: lazy(() => import("./components/Examples/Badge")),
        name: "Badge"
    },
    {
        path: "/components/breadcrumb",
        component: lazy(() => import("./components/Examples/Breadcrumb")),
        name: "Breadcrumb"
    },
    {
        path: "/components/button",
        component: lazy(() => import("./components/Examples/Button")),
        name: "Button"
    },
    {
        path: "/components/card",
        component: lazy(() => import("./components/Examples/Card")),
        name: "Card"
    },
    {
        path: "/components/carousel",
        component: lazy(() => import("./components/Examples/Carousel")),
        name: "Carousel"
    },
    {
        path: "/components/collapse",
        component: lazy(() => import("./components/Examples/Collapse")),
        name: "Collapse"
    },
    {
        path: "/components/dropdown",
        component: lazy(() => import("./components/Examples/Dropdown")),
        name: "Dropdown"
    },
    /*   {
          path: "/components/drawer",
          component: Drawer,
          name: "Drawer"
      }, */
    {
        path: "/components/form",
        component: lazy(() => import("./components/Examples/Form")),
        name: "Form"
    },

    {
        path: "/components/input",
        component: lazy(() => import("./components/Examples/Input")),
        name: "Input"
    },
    {
        path: "/components/jumbotron",
        component: lazy(() => import("./components/Examples/Jumbotron")),
        name: "Jumbotron"
    },
    {
        path: "/components/layout",
        component: lazy(() => import("./components/Examples/Layout")),
        name: "Layout"
    },
    {
        path: "/components/list-group",
        component: lazy(() => import("./components/Examples/ListGroup")),
        name: "ListGroup"
    },
    {
        path: "/components/media",
        component: lazy(() => import("./components/Examples/Media")),
        name: "Media"
    },
    {
        path: "/components/modal",
        component: lazy(() => import("./components/Examples/Modal")),
        name: "Modal"
    },
    {
        path: "/components/nav",
        component: lazy(() => import("./components/Examples/Nav")),
        name: "Nav"
    },
    {
        path: "/components/navbar",
        component: lazy(() => import("./components/Examples/Navbar")),
        name: "Navbar"
    },
    {
        path: "/components/pagination",
        component: lazy(() => import("./components/Examples/Pagination")),
        name: "Pagination"
    },
    {
        path: "/components/popover",
        component: lazy(() => import("./components/Examples/Popover")),
        name: "Popover"
    },
    {
        path: "/components/progress",
        component: lazy(() => import("./components/Examples/Progress")),
        name: "Progress"
    },
    {
        path: "/components/spinner",
        component: lazy(() => import("./components/Examples/Spinner")),
        name: "Spinner"
    },
    {
        path: "/components/tabs",
        component: lazy(() => import("./components/Examples/Tabs")),
        name: "Tabs"
    },
    {
        path: "/components/toast",
        component: lazy(() => import("./components/Examples/Toast")),
        name: "Toast"
    },
    {
        path: "/components/tooltip",
        component: lazy(() => import("./components/Examples/Tooltip")),
        name: "Tooltip"
    }
]
