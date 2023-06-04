import React from "react"
import { createHashRouter, RouterProvider } from "react-router-dom"
import Loading from "./examples/loading"
import ModalExample from "./examples/modal"
import OffCanvas from "./examples/offcanvas"
import Toast from "./examples/toast"
import PopupExample from "./examples/popup"
import TooltipExample from "./examples/tooltip"
import PopoverExample from "./examples/popover"
import DropdownExample from "./examples/dropdown"
import Main from "./main"

const router = createHashRouter([
    {
        path: "/components",
        element: <Main />,
        children: [
            {
                path: "dropdown",
                element: <DropdownExample />
            },
            {
                path: "loading",
                element: <Loading />
            },
            {
                path: "modal",
                element: <ModalExample />
            },
            {
                path: "offcanvas",
                element: <OffCanvas />
            },
            {
                path: "popover",
                element: <PopoverExample />
            },
            {
                path: "popup",
                element: <PopupExample />
            },
            {
                path: "toast",
                element: <Toast />
            },
            {
                path: "tooltip",
                element: <TooltipExample />
            }
        ]
    }
])

export default function Router() {
    return <RouterProvider router={router} />
}