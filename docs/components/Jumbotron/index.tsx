import * as React from "react";
import DocHeading from "../DocHeading";
import DemoExample from "../DemoExample";
import Demo from "./Demo";
import DemoSrc from "!!raw-loader!./Demo";
import Fluid from "./Fluid";
import FluidSrc from "!!raw-loader!./Fluid";
import API from "./API";

export default () => (
    <>
        <DocHeading>Jumbotron</DocHeading>
        <DemoExample
            component={<Demo />}
            source={DemoSrc}>
            A lightweight, flexible component that can optionally extend the entire viewport to showcase key marketing messages on your site.
        </DemoExample>
        <DemoExample
            component={<Fluid />}
            source={FluidSrc}>
            To make the jumbotron full width, and without rounded corners, pass the <code>fluid</code> prop or within <code>fluid Container</code>
        </DemoExample>
        <API />
    </>
);