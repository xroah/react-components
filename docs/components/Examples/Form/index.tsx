import * as React from "react";
import DocHeading from "../../DocHeading";
import DemoExample from "../../DemoExample";
import Basic from "./Basic";
import BasicSrc from "!!raw-loader!./Basic";
import Grid from "./Grid";
import GridSrc from "!!raw-loader!./Grid";
import Row from "./FormRow";
import RowSrc from "!!raw-loader!./FormRow";
import ComplexGrid from "./ComplexGrid";
import ComplexGridSrc from "!!raw-loader!./ComplexGrid";
import Horizontal from "./Horizontal";
import HorizontalSrc from "!!raw-loader!./Horizontal";
import Inline from "./Inline";
import InlineSrc from "!!raw-loader!./Inline";
import Indeterminate from "./Indeterminate";
import IndeterminateSrc from "!!raw-loader!./Indeterminate";
import { Checkbox, Radio, Switch } from "reap-ui";
import API from "./API";
import SyntaxHighlighter from "../../SyntaxHighlighter";

export default () => (
    <>
        <DocHeading>Form</DocHeading>
        <div>
            Examples and usage guidelines for form control styles, layout options, and custom components for creating a wide variety of forms.
        </div>
        <div>
            Here’s a quick example to demonstrate Bootstrap’s form styles. Keep reading for documentation on required classes, form layout, and more.
        </div>
        <DemoExample
            component={<Basic />}
            source={BasicSrc} />
        <DemoExample
            title="Form grid"
            component={<Grid />}
            source={GridSrc}>
            More complex forms can be built using our grid components.
        </DemoExample>
        <DemoExample
            title="Form row"
            component={<Row />}
            source={RowSrc}>
            You may also set 'form' true for Row, a variation of our standard grid row that overrides the default column gutters for tighter and more compact layouts.
        </DemoExample>
        <DemoExample
            component={<ComplexGrid />}
            source={ComplexGridSrc}>
            More complex layouts can also be created with the grid system.
        </DemoExample>
        <DemoExample
            title="Horizontal form"
            component={<Horizontal />}
            source={HorizontalSrc}>
            Create horizontal forms with the grid by adding the <code>horizontal</code>,
        <code>labelCol</code> and <code>wrapperCol</code> to <code>Form</code> or <code>Form.Item</code>.
        </DemoExample>
        <DemoExample
            title="Inline form"
            component={<Inline />}
            source={InlineSrc}>
            Use the <code>inline</code> prop to display a series of labels, form controls, and buttons on a single horizontal row.
        </DemoExample>
        <DocHeading tag="h3">Checkboxes</DocHeading>
        <div className="bd-example">
            <Checkbox>Check this custom checkbox</Checkbox>
            <Checkbox disabled>Disabled checkbox</Checkbox>
            <SyntaxHighlighter code={"<Checkbox>Check this custom checkbox</Checkbox>\n<Checkbox disabled>Disabled checkbox</Checkbox>"} />
        </div>
        <DemoExample
            component={<Indeterminate />}
            source={IndeterminateSrc}>
            Custom checkboxes can also utilize the <code>:indeterminate</code> pseudo class when manually set via JavaScript (there is no available HTML attribute for specifying it).
        </DemoExample>
        <DocHeading tag="h3">Radios</DocHeading>
        <div className="bd-example">
            <Radio name="radio">Toggle this custom radio</Radio>
            <Radio name="radio">Or toggle this other custom radio</Radio>
            <Radio name="radio" disabled>Disabled radio</Radio>
            <SyntaxHighlighter code={`<Radio name="radio">Toggle this custom radio</Radio>\n<Radio name="radio">Or toggle this other custom radio</Radio>\n<Radio name="radio" disabled>Disabled radio</Radio>`} />
        </div>
        <DocHeading tag="h3">Switches</DocHeading>
        <div className="bd-example">
            <Switch defaultChecked>Toggle this switch element</Switch>
            <Switch disabled>Disabled switch</Switch>
            <SyntaxHighlighter code={"<Switch defaultChecked>Toggle this switch element</Switch>\n<Switch disabled>Disabled switch</Switch>"} />
        </div>
        <API />
    </>
);