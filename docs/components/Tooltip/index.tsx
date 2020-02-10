import * as React from "react";
import DocHeading from "../DocHeading";
import DemoExample from '../DemoExample';
import Demo from "./Demo";
import DemoSrc from "!!raw-loader!./Demo";
import WithHTML from "./WithHTML";
import WithHTMLSrc from "!!raw-loader!./WithHTML"
import API from "./API";

export default () => {
    return (
        <>
            <DocHeading>Examples</DocHeading>
            <DemoExample component={<Demo />} source={DemoSrc} >
                Hover over the buttons below to see the four tooltips directions: top, right, bottom, and left.
            </DemoExample>
            <DemoExample
                title="With custom HTML"
                component={<WithHTML />}
                source={WithHTMLSrc} />
            <API />
        </>
    );
};