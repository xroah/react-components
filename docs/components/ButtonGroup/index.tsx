import * as React from "react";
import Basic from "./Basic";
import ButtonToolbar from "./ButtonToolbar";
import Sizing from "./Sizing"
import Vertical from "./Vertical";
import DocHeading from "../DocHeading";
import DemoExample from "../DemoExample";

const BasicSrc = require("!!raw-loader!./Basic").default;
const ButtonToolbarSrc = require("!!raw-loader!./ButtonToolbar").default;
const SizingSrc = require("!!raw-loader!./Sizing").default;
const VerticalSrc = require("!!raw-loader!./Vertical").default;

export default () => (
    <>
        <DocHeading>Button Group</DocHeading>
        <DemoExample component={<Basic/>} source={BasicSrc}/>
        <DocHeading>Button Toolbar</DocHeading>
        <DemoExample component={<ButtonToolbar/>} source={ButtonToolbarSrc}/>
        <DocHeading>Button Group sizing</DocHeading>
        <DemoExample component={<Sizing/>} source={SizingSrc}/>
        <h2 className="doc-header">Nesting</h2>
        <div className="bd-example">
            coming soon
        </div>
        <DocHeading>Button Group vertical</DocHeading>
        <DemoExample component={<Vertical/>} source={VerticalSrc}/>
    </>
);