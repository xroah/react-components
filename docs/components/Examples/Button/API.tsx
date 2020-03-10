import * as React from "react";
import PropsTable from "../../PropsTable";
import DocHeading from "../../DocHeading";

const CommonProps = [{
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
    name: "size",
    type: "'lg' | 'small'",
    description: "Specifies the large or small button."
}, {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disable the button and apply 'disabled' class."
}];
const ButtonProps = [
    ...CommonProps, {
        name: "type",
        type: `"button" | "submit" | "reset"`,
        default: "button",
        description: "Button type"
    }, {
        name: "block",
        type: "boolean",
        default: "false",
        description: "Spans the full width of the Button parent."
    }, {
        name: "active",
        type: "boolean",
        default: "false",
        description: "Apply 'active' class to button."
    }, {
        name: "href",
        type: "string",
        description: "Render the button as 'a' element, styled like button."
    }
];
const ToggleProps = [
    ...CommonProps,
    {
        name: "type",
        type: `"checkbox" | "radio"`,
        description: "Type for underlying input element. If set, the type prop from Button.ToggleGroup will be overrode"
    }
]

export default () => (
    <>
        <DocHeading>API</DocHeading>
        <PropsTable title="Button" data={ButtonProps} />
        <PropsTable title="Button.Toggle" data={CommonProps} />
    </>
);