import * as React from "react";
import {render} from "react-dom";
import Button from "../src/button";
import "bootstrap/dist/css/bootstrap.css"

const div = document.createElement("div");

document.body.append(div);

render(
    <Button/>,
    div
);