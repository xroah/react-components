import * as React from "react";
import Basic from "./Basic";
import Link from "./Link";
import Dismissible from "./Dismissible";
import Toggle from "./Toggle";
import DemoExample from "../../DemoExample";
import API from "./API";
import BasicSrc from "!!raw-loader!./Basic";
import DismissibleSrc from "!!raw-loader!./Dismissible";
import ToggleSrc from "!!raw-loader!./Toggle";
import LinkSrc from "!!raw-loader!./Link";
import DocHeading from "../../DocHeading";
import AdditionalContent from "./AdditionalContent";
import AdditionalContentSrc from "!!raw-loader!./AdditionalContent";

export default () => (
    <>
        <DocHeading>Alert</DocHeading>
        <div>
            Provide contextual feedback messages for typical user actions with the handful of available and flexible alert messages.
        </div>
        <DemoExample title="Examples" component={<Basic />} source={BasicSrc}>
            Alerts are available for any length of text, as well as an optional dismiss button. For proper styling, use one of the eight variants (e.g., <code>variant="success"</code>).
        </DemoExample>
        <DemoExample title="Link color" component={<Link />} source={LinkSrc}>
            Use the <code>Alert.Link</code> to quickly provide matching colored links within any alert.
        </DemoExample>
        <DemoExample
            title="Additional content"
            component={<AdditionalContent />}
            source={AdditionalContentSrc}>
            Alerts can also contain additional HTML elements like headings, paragraphs and dividers.
        </DemoExample>
        <DemoExample title="Dismissing" component={<Dismissible />} source={DismissibleSrc} />
        <DemoExample title="Toggle" component={<Toggle />} source={ToggleSrc} />
        <API />
    </>
);