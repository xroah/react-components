import * as React from "react"
import { createRoot } from "react-dom/client"
import App from "./app"

import "bootstrap/dist/css/bootstrap.css"
import "./styles/index.scss"
import "../src/styles/index.scss"

const appEl = document.getElementById("app")
const root = createRoot(appEl)

root.render(<App />)