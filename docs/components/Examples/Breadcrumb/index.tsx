import * as React from "react";
import DocHeading from "../../DocHeading";
import DemoExample from "../../DemoExample";
import Basic from "./Basic";
import BasicSrc from "!!raw-loader!./Basic";
import API from "./API";

export default function Breadcrumb() {
    return (
        <>
            <DocHeading>BreadCrumb</DocHeading>
            <div>
                Indicate the current page’s location within a navigational hierarchy that automatically adds separators via CSS.
            </div>
            <DemoExample
                title="Example"
                component={<Basic />}
                source={BasicSrc} />
            <API />
        </>
    );
}