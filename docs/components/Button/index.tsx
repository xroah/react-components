import * as React from "react";
import DocHeading from "../DocHeading";
import Basic from "./Basic";
import DemoExample from "../DemoExample";
import Outlined from "./Outlined";
import { Button } from "reap-ui";
import SyntaxHighlighter from "../SyntaxHighlighter";
import ButtonGroup from "../ButtonGroup";
import API from "./API";
import ButtonGroupAPI from "../ButtonGroup/API";
import BasicSrc from "!!raw-loader!./Basic";
import OutlinedSrc from "!!raw-loader!./Outlined";

export default () => (
    <>
        <DemoExample
            title="Basic examples"
            className="btn-demo"
            component={<Basic />}
            source={BasicSrc} />
        <DemoExample
            title="Outline buttons"
            className="btn-demo"
            component={<Outlined />}
            source={OutlinedSrc} />
        <DocHeading>Sizes</DocHeading>
        <div className="btn-demo bd-example">
            <div>
                <Button variant="primary" size="lg">Large Button</Button>
                <Button variant="secondary" size="lg">Large Button</Button>
            </div>
            <SyntaxHighlighter code={`<Button variant="primary" size="lg">Large button</Button>
<Button variant="secondary" size="lg">Large button</Button>`} />
        </div>
        <div className="btn-demo bd-example">
            <div>
                <Button variant="primary" size="sm">Small button</Button>
                <Button variant="secondary" size="sm">Small button</Button>
            </div>
            <SyntaxHighlighter code={`<Button variant="primary" size="sm">Small button</Button>
<Button variant="secondary" size="sm">Small button</Button>`} />
        </div>
        <div className="btn-demo bd-example">
            <div>
                <Button variant="primary" size="lg" block>Block level button</Button>
                <Button variant="secondary" size="lg" block>Block level button</Button>
            </div>
            <SyntaxHighlighter code={`<Button variant="primary" size="lg" block>Block level button</Button>
<Button variant="secondary" size="lg" block>Block level button</Button>`} />
        </div>
        <DocHeading>Active state</DocHeading>
        <div className="btn-demo bd-example">
            <div>
                <Button variant="primary" href="#" active>Primary Link</Button>
                <Button variant="secondary" href="#" active>Link</Button>
            </div>
            <SyntaxHighlighter code={`<Button variant="primary" href="#" active>Primary Link</Button>
<Button variant="secondary" href="#" active>Link</Button>`} />
        </div>
        <DocHeading>Disabled state</DocHeading>
        <div className="btn-demo bd-example">
            <div>
                <Button variant="primary" href="#" disabled>Primary Link</Button>
                <Button variant="secondary" href="#" disabled>Link</Button>
            </div>
            <SyntaxHighlighter code={`<Button variant="primary" href="#" disabled>Primary Link</Button>
<Button variant="secondary" href="#" disabled>Link</Button>`} />
        </div>
        <DocHeading>Checkbox and radio buttons</DocHeading>
        <ButtonGroup />
        <API />
        <ButtonGroupAPI />
    </>
);