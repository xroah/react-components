import * as React from "react";
import Basic from "./Basic";
import Dismissible from "./Dismissible";
import Toggle from "./Toggle";
import DocHeading from "../DocHeading";
import DemoExample from "../DemoExample";
import API from "./API";

const BasicSrc = require("!!raw-loader!./Basic").default;
const DismissibleSrc = require("!!raw-loader!./Dismissible").default;
const ToggleSrc = require("!!raw-loader!./Toggle").default;

export default class AlertDemo extends React.Component {

    render() {
        return (
            <>
                <DocHeading>Basic example</DocHeading>
                <DemoExample component={<Basic/>} source={BasicSrc}/>
                <DocHeading>Dismissible</DocHeading>
                <DemoExample component={<Dismissible/>} source={DismissibleSrc}/>
                <DocHeading>Toggle</DocHeading>
                <DemoExample component={<Toggle/>} source={ToggleSrc}/>
                <API/>
            </>
        );
    }

}