import * as React from "react";
import DocHeading from "../../DocHeading";
import DemoExample from "../../DemoExample";
import Basic from "./Basic";
import BasicSrc from "!!raw-loader!./Basic";
import Center from "./Center";
import CenterSrc from "!!raw-loader!./Center";
import Right from "./Right";
import RightSrc from "!!raw-loader!./Right";
import Vertical from "./Vertical";
import VerticalSrc from "!!raw-loader!./Vertical";
import Tabs from "./Tabs";
import TabsSrc from "!!raw-loader!./Tabs";
import Pill from "./Pill";
import PillSrc from "!!raw-loader!./Pill";
import Fill from "./Fill";
import FillSrc from "!!raw-loader!./Fill";
import Justify from "./Justify";
import JustifySrc from "!!raw-loader!./Justify";
import TabDropdown from "./TabDropdown";
import TabDropdownSrc from "!!raw-loader!./TabDropdown";
import PillDropdown from "./PillDropdown";
import PillDropdownSrc from "!!raw-loader!./PillDropdown";
import API from "./API";

export default () => (
    <>
        <DemoExample
            title="Base nav"
            component={<Basic />}
            source={BasicSrc}>
            Navigation available in Bootstrap share general markup and styles, from the base <code>Nav</code> to the active and disabled states.
            The base <code>Nav</code> component is built with flexbox and provide a strong foundation for building all types of navigation components.
            <div className="bd-callout-info">
                The base <code>Nav</code> component does not include any active state. The following examples include the active prop, mainly to demonstrate that this particular prop does not trigger any special styling.
            </div>
        </DemoExample>
        <DemoExample
            title="Horizontal alignment"
            component={<Center />}
            source={CenterSrc}>
            Change the horizontal alignment of your nav with <code>alignment</code> prop. By default, navs are left-aligned, but you can easily change them to center or right aligned.
        </DemoExample>
        <DemoExample
            component={<Right />}
            source={RightSrc} />
        <DemoExample
            title="Vertical"
            component={<Vertical />}
            source={VerticalSrc}>
            Stack your navigation by changing the flex item direction with the <code>vertical</code> prop. Need to stack them on some viewports but not others? Use the responsive minWidth prop (e.g., sm).
        </DemoExample>
        <DemoExample
            title="Tabs"
            component={<Tabs />}
            source={TabsSrc}>
            Takes the basic nav from above and set <code>variant="tab"</code> to generate a tabbed interface(you should use <code>Nav.Item</code> to clear border-bottom when the tab is active). Use them to create tabbable regions with our <code>Tabs</code> component.
        </DemoExample>
        <DemoExample
            title="Pills"
            component={<Pill />}
            source={PillSrc}>
            Use <code>variant="pill"</code> instead.
        </DemoExample>
        <DocHeading tag="h3">Fill and justify</DocHeading>
        <DemoExample
            component={<Fill />}
            source={FillSrc}>
            Force your contents to extend the full available width. To proportionately fill all available space with your <code>Nav.Item</code>, use <code>fill</code> prop. Notice that all horizontal space is occupied, but not every nav item has the same width.
        </DemoExample>
        <DemoExample
            component={<Justify />}
            source={JustifySrc}>
            For equal-width elements, use <code>equalWidth</code> prop. All horizontal space will be occupied, but unlike the fill above, every nav item will be the same width.
        </DemoExample>
        <DocHeading>Using dropdowns</DocHeading>
        <div>You should use with <code>Nav.Item</code> for some extra styles.</div>
        <DemoExample
            title="Tabs with dropdowns"
            component={<TabDropdown />}
            source={TabDropdownSrc} />
        <DemoExample
            title="Pills with dropdowns"
            component={<PillDropdown />}
            source={PillDropdownSrc} />
        <API />
    </>
);