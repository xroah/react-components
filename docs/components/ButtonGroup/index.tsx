import * as React from "react";
import Basic from "./Basic";
import ButtonToolbar from "./ButtonToolbar";
import Sizing from "./Sizing"
import Vertical from "./Vertical";
import API from "./API";
import DocHeading from "../DocHeading";
import DemoExample from "../DemoExample";

const BasicSrc = require("!!raw-loader!./Basic").default;
const ButtonToolbarSrc = require("!!raw-loader!./ButtonToolbar").default;
const SizingSrc = require("!!raw-loader!./Sizing").default;
const VerticalSrc = require("!!raw-loader!./Vertical").default;

export default () => (
    <>
        <DocHeading>Basic</DocHeading>
        <DemoExample component={<Basic/>} source={BasicSrc}/>
        <DocHeading>Button toolbar</DocHeading>
        <DemoExample component={<ButtonToolbar/>} source={ButtonToolbarSrc}/>
        <DocHeading>Sizing</DocHeading>
        <DemoExample component={<Sizing/>} source={SizingSrc}/>
        <h2 className="doc-header">Nesting</h2>
        <div className="bd-example">
            coming soon
        </div>
        <DocHeading>Vertical</DocHeading>
        <DemoExample component={<Vertical/>} source={VerticalSrc}/>
        <API/>
    </>
);