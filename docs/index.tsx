import * as React from "react"
import { render } from "react-dom"
import Examples from "./examples"
import "bootstrap/dist/css/bootstrap.css"
import "./styles/index.scss"

const section = document.createElement("section")

section.id = "root"
document.body.append(section)

render(
    <Examples/>,
    section
)