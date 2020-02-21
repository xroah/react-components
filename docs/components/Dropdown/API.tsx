import * as React from "react";
import PropsTable from "../PropsTable";
import DocHeading from "../DocHeading";
import NoAPI from "../NoAPI";

export const TRIGGER_TYPE = "hover | click | focus | Array<hover | click | focus>";
export const commonProps = [
    {
        name: "visible",
        type: "boolean",
        description: "Control the visibility(controlled component)"
    },{
        name: "defaultVisible",
        type: "boolean",
        default: "false",
        description: "The initial visibility"
    },{
        name: "flip",
        type: "boolean",
        default: "true",
        description: "If true, the popup will flip to opposite position if space is insufficient"
    }, {
        name: "fade",
        type: "boolean",
        default: "true",
        description: "Enable fade effect of dropdown popup or not"
    }, {
        name: "offset",
        type: "number | number[]",
        default: "[0, 0]",
        description: "Offset of dropdown popup"
    }, {
        name: "delay",
        type: "number | {show?: number, hide?: number}",
        default: "0",
        description: "A millisecond delay to show or hide the popup"
    }, {
        name: "onShow",
        type: "Function",
        description: "Callback is invoked when visible changes from false to true"
    }, {
        name: "onShown",
        type: "Function",
        description: "Callback is invoked when popup has been shown"
    }, {
        name: "onHide",
        type: "Function",
        description: "Callback is invoked when visible change from true to false"
    }, {
        name: "onHidden",
        type: "Function",
        description: "Callback is invoked when popup has been hidden"
    }
];

const DropdownProps = [
    ...commonProps,
    {
        name: "placement",
        type: "top | bottom | left | right",
        default: "bottom",
        description: "The dropdown popup position"
    }, {
        name: "alignment",
        type: "left | center | right",
        default: "left",
        description: "Horizontal alignment of dropdown popup"
    }, {
        name: "overlay",
        type: "ReactElement",
        description: "The dropdown popup"
    }];
const DropdownButtonProps = [{
    name: "variant",
    type: `"primary" |
        "secondary" |
        "success" |
        "danger" |
        "warning" |
        "info" |
        "dark" |
        "light"`,
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
}, {
    name: "outline",
    type: "boolean",
    default: "false",
    description: "Outlined buttton"
}, {
    name: "href",
    type: "string",
    description: "Render the button as 'a' element, styled like button."
}, {
    name: "split",
    type: "boolean",
    default: "false",
    description: "Split button dropdowns with virtually the same markup as single button dropdowns"
}];
const DropdownMenuProps = [{
    name: "header",
    type: "string | ReactNode",
    description: "Header of the menu"
}];
const MenuItemProps = [{
    name: "tag",
    type: "string",
    default: "a",
    description: "A custom element type"
}, {
    name: "href",
    type: "string",
    description: "Href attribute of 'a' tag, if tag equals 'a' will apply otherwise will ignore"
}, {
    name: "active",
    type: "boolean",
    default: "false",
    description: "Activate the component"
}, {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disable the component"
}];

export default () => (
    <>
        <DocHeading>API</DocHeading>
        <PropsTable title="Dropdown" data={DropdownProps} />
        <PropsTable title="Dropdown.Button" data={DropdownButtonProps} />
        <PropsTable title="Dropdown.Menu" data={DropdownMenuProps} />
        <PropsTable title="Dropdown.Item" data={MenuItemProps} />
        <NoAPI title="Dropdown.Divider" />
    </>
);