import * as React from "react";
import DocHeading from "../DocHeading";
import DemoExample from "../DemoExample";
import SingleButton from "./SingleButton";
import SingleButtonSrc from "!!raw-loader!./SingleButton";
import SplitButton from "./SplitButton";
import SplitButtonSrc from "!!raw-loader!./SplitButton";
import Sizing from "./Sizing";
import SizingSrc from "!!raw-loader!./Sizing";
import Directions from "./Directions";
import DirectionSrc from "!!raw-loader!./Directions";
import Alignment from "./Alignment";
import AlignmentSrc from "!!raw-loader!./Alignment";
import Custom from "./Custom";
import CustomSrc from "!!raw-loader!./Custom";
import API from "./API";

export default () => (
    <>
        <DocHeading>Overview</DocHeading>
        <div>
            Dropdowns are toggleable, contextual overlays for displaying lists of links and more.
        </div>
        <DemoExample
            title="Single button"
            component={<SingleButton />}
            source={SingleButtonSrc} />
        <DemoExample
            title="Split button"
            component={<SplitButton />}
            source={SplitButtonSrc} />
        <DemoExample
            className="dropdown-demo"
            title="Sizing"
            component={<Sizing />}
            source={SizingSrc}>
            Button dropdowns work with buttons of all sizes, including default and split dropdown buttons.
        </DemoExample>
        <DemoExample
            className="dropdown-demo"
            title="Directions"
            component={<Directions />}
            source={DirectionSrc}>
            Trigger dropdown menus above,bottom,left or right by <code>placement</code> prop.
        </DemoExample>
        <DemoExample
            title="Directions"
            component={<Alignment />}
            source={AlignmentSrc}>
            By default, a dropdown menu is automatically positioned 100% from the top and along the left side. Change it by <code>alignment</code> prop;
        </DemoExample>
        <DemoExample
            title="Customization"
            component={<Custom />}
            source={CustomSrc} />
        <API />
    </>
);