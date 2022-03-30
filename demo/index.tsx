import * as React from "react"
import {createRoot} from "react-dom/client"
import App from "./components/App"
import "bootstrap/scss/bootstrap.scss"

const root = createRoot(document.getElementById("app"))

root.render(<App />)