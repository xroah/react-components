import * as React from "react";
import { render } from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./styles/index.scss";
import Router from "./router";

const section = document.createElement("section");

section.classList.add("container");
section.id = "root";
document.body.append(section);

render(
    <Router />,
    section
);