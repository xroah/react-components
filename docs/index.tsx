import * as React from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import router from "./router"

import "./styles/index.scss"
import "bootstrap/dist/css/bootstrap.css"

const appEl = document.getElementById("app") as HTMLElement
const root = createRoot(appEl) 

root.render(<RouterProvider router={router}/>)