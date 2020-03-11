import * as React from "react";
import { render } from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./styles/index.scss";
import Layout from "./Layout";

const section = document.createElement("section");

section.id = "root";
document.body.append(section);

render(
    <Layout />,
    section
);