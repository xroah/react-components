import * as React from "react";
import DocHeading from "../DocHeading";
import DemoExample from "../DemoExample";
import Basic from "./Basic";
import BasicSrc from "!!raw-loader!./Basic";
import Dismissing from "./Dismissing";
import DismissingSrc from "!!raw-loader!./Dismissing";
import AutoHide from "./AutoHide";
import AutoHideSrc from "!!raw-loader!./AutoHide";
import API from "./API";

export default () => (
    <>
        <DocHeading>Toast</DocHeading>
        <div>
            Toasts are lightweight notifications designed to mimic the push notifications that have been popularized by mobile and desktop operating systems. They’re built with flexbox, so they’re easy to align and position.
        </div>
        <DemoExample
            title="Basic example"
            component={<Basic />}
            source={BasicSrc}>
            <p>
                To encourage extensible and predictable toasts, we recommend a header and body. Toast headers use <code>display: flex</code>, allowing easy alignment of content.
            </p>
            <p>
                Toasts are as flexible as you need and have very little required markup. At a minimum, we require a single element to contain your “toasted” content and strongly encourage a dismiss button.
            </p>
        </DemoExample>
        <DemoExample
            title="Dismissing"
            component={<Dismissing />}
            source={DismissingSrc} />
        <DemoExample
            title="Auto hide"
            component={<AutoHide />}
            source={AutoHideSrc}/>
        <API />
    </>
);