import React from "react"
import { createHashRouter } from "react-router-dom"
import Loading from "./examples/loading"
import ModalExample from "./examples/modal"
import OffCanvas from "./examples/offcanvas"
import Toast from "./examples/toast"
import PopupExample from "./examples/popup"
import TooltipExample from "./examples/tooltip"
import PopoverExample from "./examples/popover"
import DropdownExample from "./examples/dropdown"
import Main from "./main"
import CollapseExample from "./examples/collapse"
import AlertExample from "./examples/alert"
import Examples from "./examples"
import AccordionExample from "./examples/accordion"
import TabExample from "./examples/Tab"
import PaginationExample from "./examples/pagination"
import CarouselExample from "./examples/carousel"
import ButtonExample from "./examples/button"
import ImageExample from "./examples/image"

export default createHashRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "components",
                element: <Examples />,
                children: [
                    {
                        path: "accordion",
                        element: <AccordionExample />
                    },
                    {
                        path: "alert",
                        element: <AlertExample />
                    },
                    {
                        path: "button",
                        element: <ButtonExample />
                    },
                    {
                        path: "carousel",
                        element: <CarouselExample />
                    },
                    {
                        path: "collapse",
                        element: <CollapseExample />
                    },
                    {
                        path: "dropdown",
                        element: <DropdownExample />
                    },
                    {
                        path: "image",
                        element: <ImageExample />
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
                        path: "pagination",
                        element: <PaginationExample />
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
                        path: "tab",
                        element: <TabExample />
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
        ]
    }
])
