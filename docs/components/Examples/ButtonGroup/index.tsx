import * as React from "react";
import DemoExample from "../../DemoExample";
import DocHeading from "../../DocHeading";
import Basic from "./Basic";
import BasicSrc from "!!raw-loader!./Basic";
import Sizing from "./Sizing"
import SizingSrc from "!!raw-loader!./Sizing";
import Vertical from "./Vertical";
import VerticalSrc from "!!raw-loader!./Vertical";
import ButtonToolbar from "./ButtonToolbar";
import ButtonToolbarSrc from "!!raw-loader!./ButtonToolbar";
import Nesting from "./Nesting";
import NestingSrc from "!!raw-loader!./Nesting";

const { H3 } = DocHeading;

export default () => (
    <>
        <DocHeading id="buttonGroup">Button group</DocHeading>
        <DemoExample
            component={<Basic />}
            source={BasicSrc}>
            Wrap a series of <code>Button</code>s with <code>Button.Group</code>
        </DemoExample>
        <H3 id="buttonToolbar">Button toolbar</H3>
        <DemoExample
            component={<ButtonToolbar />}
            source={ButtonToolbarSrc}>
            Combine sets of button groups into button toolbars for more complex components. Use utility classes as needed to space out groups, buttons, and more.
        </DemoExample>
        <H3 id="buttonGroupSizing">Sizing</H3>
        <DemoExample
            component={<Sizing />}
            source={SizingSrc}>
            Instead of applying <code>Button</code> sizing prop to every button in a group, just set <code>size</code> prop for <code>Button.Group</code>.
        </DemoExample>
        <H3 id="nesting">Nesting</H3>
        <DemoExample
            component={<Nesting />}
            source={NestingSrc} >
            Place a <code>Button.Group</code> within another <code>Button.Group</code>  when you want dropdown menus mixed with a series of buttons.
        </DemoExample>
        <H3 id="vertical">Vertical</H3>
        <DemoExample
            component={<Vertical />}
            source={VerticalSrc} >
            Make a set of buttons appear vertically stacked rather than horizontally.
            <strong>Split button dropdowns are not supported here.</strong>
        </DemoExample>
    </>
);