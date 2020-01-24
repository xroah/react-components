import * as React from "react";
import Basic from "./Basic";
import ButtonToolbar from "./ButtonToolbar";
import Sizing from "./Sizing"
import Vertical from "./Vertical";
import DemoExample from "../DemoExample";
import BasicSrc from "!!raw-loader!./Basic";
import ButtonToolbarSrc from "!!raw-loader!./ButtonToolbar";
import SizingSrc from "!!raw-loader!./Sizing";
import VerticalSrc from "!!raw-loader!./Vertical";

export default () => (
    <>
        <DemoExample title="Button Group" component={<Basic/>} source={BasicSrc}/>
        <DemoExample title="Button Toolbar" component={<ButtonToolbar/>} source={ButtonToolbarSrc}/>
        <DemoExample title="Button Group sizing" component={<Sizing/>} source={SizingSrc}/>
        <DemoExample title="Button Group vertical" component={<Vertical/>} source={VerticalSrc}/>
    </>
);