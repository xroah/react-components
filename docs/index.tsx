import * as React from "react"
import { createRoot } from "react-dom/client"
import App from "./app"

import "./styles/index.scss"
import "../src/styles/index.scss"
import "bootstrap/dist/css/bootstrap.css"

const appEl = document.getElementById("app") as HTMLElement
const root = createRoot(appEl) 

root.render(<App />)