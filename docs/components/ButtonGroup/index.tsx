import * as React from "react";
import Basic from "./Basic";
import ButtonToolbar from "./ButtonToolbar";
import Sizing from "./Sizing"
import Vertical from "./Vertical";
import DemoExample from "../DemoExample";

const BasicSrc = require("!!raw-loader!./Basic").default;
const ButtonToolbarSrc = require("!!raw-loader!./ButtonToolbar").default;
const SizingSrc = require("!!raw-loader!./Sizing").default;
const VerticalSrc = require("!!raw-loader!./Vertical").default;

export default () => (
    <>
        <DemoExample title="Button Group" component={<Basic/>} source={BasicSrc}/>
        <DemoExample title="Button Toolbar" component={<ButtonToolbar/>} source={ButtonToolbarSrc}/>
        <DemoExample title="Button Group sizing" component={<Sizing/>} source={SizingSrc}/>
        <DemoExample title="Button Group vertical" component={<Vertical/>} source={VerticalSrc}/>
    </>
);