import * as React from "react";
import DocHeading from "../../DocHeading";
import DemoExample from '../../DemoExample';
import Basic from "./Basic";
import BasicSrc from "!!raw-loader!./Basic";
import Accordion from "./Accordion";
import AccordionSrc from "!!raw-loader!./Accordion";
import API from "./API";

export default () => {
    return (
        <>
            <DocHeading>Collapse</DocHeading>
            <div>
                Toggle the visibility of content across your project with a few classes and our JavaScript plugins.
            </div>
            <DemoExample
                title="Basic example"
                component={<Basic />}
                source={BasicSrc} />
            <DemoExample
                title="Accordion"
                component={<Accordion />}
                source={AccordionSrc} />
            <API />
        </>
    );
};