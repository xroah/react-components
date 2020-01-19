import * as React from "react";
import Basic from "./Basic";
import Link from "./Link";
import Dismissible from "./Dismissible";
import Toggle from "./Toggle";
import DemoExample from "../DemoExample";
import API from "./API";

const BasicSrc = require("!!raw-loader!./Basic").default;
const DismissibleSrc = require("!!raw-loader!./Dismissible").default;
const ToggleSrc = require("!!raw-loader!./Toggle").default;
const LinkSrc = require("!!raw-loader!./Link").default;

export default class AlertDemo extends React.Component {

    render() {
        return (
            <>
                <DemoExample title="Basic example" component={<Basic />} source={BasicSrc} />
                <DemoExample title="Link color" component={<Link />} source={LinkSrc} />
                <DemoExample title="Dismissible" component={<Dismissible />} source={DismissibleSrc} />
                <DemoExample title="Toggle" component={<Toggle />} source={ToggleSrc} />
                <API />
            </>
        );
    }

}