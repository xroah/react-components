import * as React from "react";
import DocHeading from "../../DocHeading";
import DemoExample from "../../DemoExample";
import Main from "../../Main";
import RightNav from "../../RightNav"
import Basic from "./Basic";
import BasicSrc from "!!raw-loader!./Basic";
import API from "./API";

const { H3 } = DocHeading;

export default function Breadcrumb() {
    return (
        <>
            <Main>
                <DocHeading>BreadCrumb</DocHeading>
                <div>
                    Indicate the current page’s location within a navigational hierarchy that automatically adds separators via CSS.
                </div>
                <H3 id="example">Example</H3>
                <DemoExample
                    component={<Basic />}
                    source={BasicSrc} />
                <DocHeading id="api">API</DocHeading>
                <API />
            </Main>
            <RightNav data={[{
                name: "Example",
                href: "#example"
            }, {
                name: "API",
                href: "#api"
            }]}/>
        </>
    );
}