import * as React from "react";
import Basic from "./Basic";
import Link from "./Link";
import Dismissible from "./Dismissible";
import Toggle from "./Toggle";
import DemoExample from "../DemoExample";
import API from "./API";
import BasicSrc from "!!raw-loader!./Basic";
import DismissibleSrc from "!!raw-loader!./Dismissible";
import ToggleSrc from "!!raw-loader!./Toggle";
import LinkSrc from "!!raw-loader!./Link";

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