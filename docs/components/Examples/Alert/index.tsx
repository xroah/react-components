import * as React from "react";
import DocHeading from "../../DocHeading";
import DemoExample from "../../DemoExample";
import Main from "../../Main";
import RightNav from "../../RightNav";
import Basic from "./Basic";
import BasicSrc from "!!raw-loader!./Basic";
import Dismissible from "./Dismissible";
import DismissibleSrc from "!!raw-loader!./Dismissible";
import Toggle from "./Toggle";
import ToggleSrc from "!!raw-loader!./Toggle";
import Link from "./Link";
import LinkSrc from "!!raw-loader!./Link";
import AdditionalContent from "./AdditionalContent";
import AdditionalContentSrc from "!!raw-loader!./AdditionalContent";
import API from "./API";

const { H3 } = DocHeading;

export default () => (
    <>
        <Main>
            <DocHeading>Alert</DocHeading>
            <div>
                Provide contextual feedback messages for typical user actions with the handful of available and flexible alert messages.
            </div>
            <H3 id="examples">Examples</H3>
            <DemoExample component={<Basic />} source={BasicSrc}>
                Alerts are available for any length of text, as well as an optional dismiss button. For proper styling, use one of the eight variants (e.g., <code>variant="success"</code>).
            </DemoExample>
            <H3 id="linkColor">Link color</H3>
            <DemoExample component={<Link />} source={LinkSrc}>
                Use the <code>Alert.Link</code> to quickly provide matching colored links within any alert.
            </DemoExample>
            <H3 id="additionalContent">Additional content</H3>
            <DemoExample
                component={<AdditionalContent />}
                source={AdditionalContentSrc}>
                Alerts can also contain additional HTML elements like headings, paragraphs and dividers.
            </DemoExample>
            <H3 id="dismissing">Dismissing</H3>
            <DemoExample component={<Dismissible />} source={DismissibleSrc} />
            <H3 id="toggle">Toggle</H3>
            <DemoExample component={<Toggle />} source={ToggleSrc} />
            <DocHeading id="api">API</DocHeading>
            <API />
        </Main>
        <RightNav data={[{
            name: "Examples",
            href: "#examples",
            children: [{
                name: "Link Color",
                href: "#linkColor"
            }, {
                name: "Additional content",
                href: "#additionalContent"
            }, {
                name: "Dismissing",
                href: "#dismissing"
            }, {
                name: "Toggle",
                href: "#toggle"
            }]
        }, {
            name: "API",
            href: "#api"
        }]} />
    </>
);