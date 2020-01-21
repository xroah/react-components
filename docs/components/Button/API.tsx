import * as React from "react";
import PropsTable from "../PropsTable";
import DocHeading from "../DocHeading";

const ButtonProps = [{
    name: "variant",
    type: `"primary" |
        "secondary" |
        "success" |
        "danger" |
        "warning" |
        "info" |
        "dark" |
        "light" |
        "link"`,
    default: "primary",
    description: "Appearance of Button"
}, {
    name: "type",
    type: `"button" |
        "submit" |
        "reset" |
        "checkbox" |
        "radio"`,
    default: "button",
    description: "Button type"
},
{
    name: "active",
    type: "boolean",
    default: "false",
    description: "Apply 'active' class to button."
}, {
    name: "block",
    type: "boolean",
    default: "false",
    description: "Spans the full width of the Button parent."
}, {
    name: "size",
    type: "'lg' | 'small'",
    description: "Specifies the large or small button."
}, {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disable the button and apply 'disabled' class."
}, {
    name: "href",
    type: "string",
    description: "Render the button as 'a' element, styled like button."
}];

export default () => (
    <>
        <DocHeading>API</DocHeading>
        <PropsTable title="Button" data={ButtonProps} />
    </>
);