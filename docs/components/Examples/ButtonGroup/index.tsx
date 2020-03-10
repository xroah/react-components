import * as React from "react";
import Basic from "./Basic";
import ButtonToolbar from "./ButtonToolbar";
import Sizing from "./Sizing"
import Vertical from "./Vertical";
import DemoExample from "../../DemoExample";
import BasicSrc from "!!raw-loader!./Basic";
import ButtonToolbarSrc from "!!raw-loader!./ButtonToolbar";
import SizingSrc from "!!raw-loader!./Sizing";
import VerticalSrc from "!!raw-loader!./Vertical";
import Nesting from "./Nesting";
import NestingSrc from "!!raw-loader!./Nesting";

export default () => (
    <>
        <DemoExample
            title="Button Group"
            component={<Basic />}
            source={BasicSrc}>
            Wrap a series of <code>Button</code>s with <code>Button.Group</code>
        </DemoExample>
        <DemoExample
            title="Button Toolbar"
            component={<ButtonToolbar />}
            source={ButtonToolbarSrc}>
            Combine sets of button groups into button toolbars for more complex components. Use utility classes as needed to space out groups, buttons, and more.
        </DemoExample>
        <DemoExample
            title="Button Group sizing"
            component={<Sizing />}
            source={SizingSrc}>
            Instead of applying <code>Button</code> sizing prop to every button in a group, just set <code>size</code> prop for <code>Button.Group</code>.
        </DemoExample>
        <DemoExample
            title="Nesting"
            component={<Nesting />}
            source={NestingSrc} >
            Place a <code>Button.Group</code> within another <code>Button.Group</code>  when you want dropdown menus mixed with a series of buttons.
        </DemoExample>
        <DemoExample
            title="Button Group vertical"
            component={<Vertical />}
            source={VerticalSrc} >
            Make a set of buttons appear vertically stacked rather than horizontally.
            <strong>Split button dropdowns are not supported here.</strong>
        </DemoExample>
    </>
);