import * as React from "react";
import DocHeading from "../DocHeading";
import DemoExample from "../DemoExample";
import SyntaxHighlighter from "../SyntaxHighlighter";
import { Input } from "reap-ui";
import Basic from "./Basic";
import BasicSrc from "!!raw-loader!./Basic";
import Sizing from "./Sizing";
import SizingSrc from "!!raw-loader!./Sizing";
import CR from "./CheckboxAndRadio";
import CRSrc from "!!raw-loader!./CheckboxAndRadio";
import Multiple from "./Multiple";
import MultipleSrc from "!!raw-loader!./Multiple";
import MultiAddons from "./MultiAddons";
import MultiAddonsSrc from "!!raw-loader!./MultiAddons";
import ButtonAddons from "./ButtonAddons";
import ButtonAddonsSrc from "!!raw-loader!./ButtonAddons";
import DropdownAddons from "./DropdownAddons";
import DropdownAddonsSrc from "!!raw-loader!./DropdownAddons";
import API from "./API";

export default () => (
    <>
        <DocHeading>Overview</DocHeading>
        <div>
            Easily extend form controls by adding text, buttons, or button groups on either side of textual inputs, custom selects, and custom file inputs.
        </div>
        <DemoExample
            title="Basic example"
            component={<Basic />}
            source={BasicSrc}>
            Place one add-on or button on either side of an input. You may also place one on both sides of an input. Remember to place <code>&lt;label&gt;</code>s outside the input group.
        </DemoExample>
        <DocHeading tag="h3">Readonly</DocHeading>
        <div className="bd-example">
            <Input readOnly value="Readonly input" />
            <SyntaxHighlighter code={`<Input readOnly value="Readonly input"/>`} />
        </div>
        <DocHeading tag="h3">Readonly plaintext</DocHeading>
        <div className="bd-example">
            <Input plaintext readOnly value="email@example.com" />
            <SyntaxHighlighter code={`<Input plaintext readOnly value="email@example.com"/>`} />
        </div>
        <DemoExample
            title="Sizing"
            component={<Sizing />}
            source={SizingSrc} />
        <DemoExample
            title="Checkboxes and radios"
            component={<CR />}
            source={CRSrc} />
        <DemoExample
            title="Multiple inputs"
            component={<Multiple />}
            source={MultipleSrc} />
        <DemoExample
            title="Multiple addons"
            component={<MultiAddons />}
            source={MultiAddonsSrc} />
        <DemoExample
            title="Button addons"
            component={<ButtonAddons />}
            source={ButtonAddonsSrc} />
        <DemoExample
            title="Buttons with dropdowns"
            component={<DropdownAddons />}
            source={DropdownAddonsSrc} />
        <API />
    </>
);
