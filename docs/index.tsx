import * as React from "react";
import { render } from "react-dom";
import Routes from "./routes";
import "bootstrap/dist/css/bootstrap.css";
import "./styles/index.css";

const section = document.createElement("section");
section.classList.add("container");

document.body.append(section);

render(
    <Routes />,
    section
);