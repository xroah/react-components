import * as React from "react";
import PropsTable from "../PropsTable";
import DocHeading from "../DocHeading";

const FormProps = [{
    name: "Inline",
    type: "boolean",
    default: "false",
    description: "Display the series of labels, form controls, and buttons on a single horizontal row"
},{
    name: "labelCol",
    type: "object",
    description: "Same as props of Col, wrap the label with Col"
}, {
    name: "horizontal",
    type: "boolean",
    default: "false",
    description: "Create horizontal forms"
}, {
    name: "wrapperCol",
    type: "object",
    description: "Same as props of Col, wrap the children of Form.Item with Col"
}, {
    name: "labelAlign",
    type: "left | right",
    default: "left",
    description: "Text alignment of label"
}];
const FormItemProps = [{
    name: "horizontal",
    type: "boolean",
    default: "false",
    description: "Create horizontal form item"
}, {
    name: "labelText",
    type: "string | ReactNode",
    description: "Label text"
}, {
    name: "label",
    type: "boolean",
    default: "true",
    description: "Wrap the label text with label element or not"
}, {
    name: "labelCol",
    type: "object",
    description: "Same as props of Col, wrap the label with Col.It will override the labelCol of Form"
}, {
    name: "labelAlign",
    type: "left | right",
    default: "left",
    description: "Text alignment of label. It will override the labelAlign of Form"
}, {
    name: "wrapperCol",
    type: "object",
    description: "Same as props of Col, wrap the children with Col. It will override the wrapperCol of Form."
},{
    name: "htmlFor",
    type: "string",
    description: "Set 'htmlFor' for underlying label element"
}, {
    name: "help",
    type: "string | ReactNode",
    description: "Help text."
}, {
    name: "control",
    type: "boolean",
    description: "Add 'form-control' to the className of children"
}];
const CustomProps = [{
    name: "autoFocus",
    type: "boolean",
    default: "false",
    description: "Auto focus once the component mounted"
}, {
    name: "checked",
    type: "boolean",
    default: "false",
    description: "The component checked or not"
}, {
    name: "defaultChecked",
    type: "boolean",
    default: "false",
    description: "Initial checked of the component"
}, {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disable the component"
}, {
    name: "onChange",
    type: "Function",
    description: "Fires when checked state changed."
}, {
    name: "inline",
    type: "boolean",
    default: "false",
    description: "Inline mode."
}];

export default () => (
    <>
        <DocHeading>API</DocHeading>
        <PropsTable title="Form" data={FormProps}/>
        <PropsTable title="Form.Item" data={FormItemProps}/>
        <PropsTable title="Checkbox, Radio and Switch" data={CustomProps}/>
        <div>
            <strong>Note:</strong>
            The <code>className</code> and <code>style</code> props will pass to the root element of Checkbox, Radio or Switch, other props will pass to the input element.
        </div>
    </>
);