import * as React from "react";
import DocHeading from "../../DocHeading";
import DemoExample from "../../DemoExample";
import Basic from "./Basic";
import BasicSrc from "!!raw-loader!./Basic";
import Pills from "./Pills";
import PillsSrc from "!!raw-loader!./Pills";
import WithoutAnimation from "./WithoutAnimation";
import WithoutAnimationSrc from "!!raw-loader!./WithoutAnimation";
import Custom from "./Custom";
import CustomSrc from "!!raw-loader!./Custom";
import API from "./API";

export default () => (
    <>
        <DocHeading>Tabs</DocHeading>
        <div>
            Note that dynamic tabbed interfaces should not contain dropdown menus, as this causes both usability and accessibility issues. From a usability perspective, the fact that the currently displayed tab’s trigger element is not immediately visible (as it’s inside the closed dropdown menu) can cause confusion. From an accessibility point of view, there is currently no sensible way to map this sort of construct to a standard WAI ARIA pattern, meaning that it cannot be easily made understandable to users of assistive technologies.
        </div>
        <DemoExample
            title="Basic example"
            component={<Basic />}
            source={BasicSrc} />
        <DemoExample
            title="Pills"
            component={<Pills />}
            source={PillsSrc} />
        <DemoExample
            title="Without animation"
            component={<WithoutAnimation />}
            source={WithoutAnimationSrc} />
        <DemoExample
            title="Customization"
            component={<Custom />}
            source={CustomSrc} />
        <API />
    </>
);
