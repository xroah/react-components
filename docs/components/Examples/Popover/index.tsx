import * as React from "react";
import DocHeading from "../../DocHeading";
import DemoExample from "../../DemoExample";
import Demo from "./Demo";
import DemoSrc from "!!raw-loader!./Demo"
import FourDirections from "./FourDirections";
import FourDirectionsSrc from "!!raw-loader!./FourDirections"
import API from "./API";

export default () => (
    <>
        <DocHeading>Example</DocHeading>
        <DemoExample component={<Demo />} source={DemoSrc} />
        <DemoExample
            title="Four directions"
            component={<FourDirections />}
            source={FourDirectionsSrc}>
            Four options are available: top, right, bottom, and left aligned.
        </DemoExample>
        <API />
    </>
);