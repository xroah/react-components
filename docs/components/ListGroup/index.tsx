import * as React from "react";
import DocHeading from "../DocHeading";
import DemoExample from "../DemoExample";
import Basic from "./Basic";
import BasicSrc from "!!raw-loader!./Basic";
import ActiveOrDisable from "./ActiveOrDisable";
import ActiveOrDisableSrc from "!!raw-loader!./ActiveOrDisable";
import Action from "./Action";
import ActionSrc from "!!raw-loader!./Action";
import Flush from "./Flush";
import FlushSrc from "!!raw-loader!./Flush";
import Horizontal from "./Horizontal";
import HorizontalSrc from "!!raw-loader!./Horizontal";
import HorizontalSm from "./HorizontalSm";
import HorizontalSmSrc from "!!raw-loader!./HorizontalSm";
import Contextual from "./Contextual";
import ContextualSrc from "!!raw-loader!./Contextual";
import ContextualAction from "./ContextualAction";
import ContextualActionSrc from "!!raw-loader!./ContextualAction";
import API from "./API";

export default () => (
    <>
        <DocHeading>List group</DocHeading>
        <div>
            List groups are a flexible and powerful component for displaying a series of content. Modify and extend them to support just about any content within.
        </div>
        <DemoExample
            title="Basic example"
            component={<Basic />}
            source={BasicSrc} />
        <DemoExample
            title="Active or disabled"
            component={<ActiveOrDisable />}
            source={ActiveOrDisableSrc}>
            Set the <code>active/disabled</code> prop to activate/disable the selection.
        </DemoExample>
        <DemoExample
            title="Action"
            component={<Action />}
            source={ActionSrc}>
            List item actions will render as a <code>button</code> or <code>a</code>(depends on the presence of an href)
        </DemoExample>
        <DemoExample
            title="Flush"
            component={<Flush />}
            source={FlushSrc}>
            Set flush prop to remove some borders and rounded corners to render list group items edge-to-edge in a parent container (e.g., cards).
        </DemoExample>
        <DemoExample
            title="Horizontal"
            component={<Horizontal />}
            source={HorizontalSrc}>
            Set horizontal prop to change the layout of list group items from vertical to horizontal across all breakpoints. Alternatively, choose a responsive variant(set minWidth: sm | md | lg | xl) to make a list group horizontal starting at that breakpoint’s <code>min-width</code>. Currently horizontal list groups cannot be combined with flush list groups.

            ProTip: Want equal-width list group items when horizontal? Set equalWith to each list group item.
        </DemoExample>
        <DemoExample
            component={<HorizontalSm />}
            source={HorizontalSmSrc} />
        <DemoExample
            title="Contextual classes"
            component={<Contextual />}
            source={ContextualSrc}>
            Use variant prop to style list items with a stateful background and color.
        </DemoExample>
        <DemoExample
            component={<ContextualAction />}
            source={ContextualActionSrc}>
            Contextual classes also work with action. Note the addition of the hover styles here not present in the previous example. Also supported is the active state; apply it to indicate an active selection on a contextual list group item.
        </DemoExample>
        <API />
    </>
);