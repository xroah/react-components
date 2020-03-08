import * as React from "react";
import PropsTable from "../../PropsTable";
import DocHeading from "../../DocHeading";

const ListGroupProps = [{
    name: "horizontal",
    type: "boolean",
    default: "false",
    description: "Change the layout of list group items from vertical to horizontal "
}, {
    name: "flush",
    type: "boolean",
    default: "false",
    description: "Remove some borders and rounded corners to render list group items edge-to-edge in a parent container"
}, {
    name: "minWidth",
    type: `"sm" | "md" | "lg" | "xl"`,
    description: "Make a list group horizontal starting at that breakpoint’s min-width, it will be ignored if horizontal is false"
}];
const ItemProps = [{
    name: "active",
    type: "boolean",
    default: "false",
    description: "Activate the item"
}, {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disable the item"
}, {
    name: "action",
    type: "boolean",
    default: "false",
    description: "Create actionable list group items with hover, disabled, and active states"
}, {
    name: "variant",
    type: `"primary" |
     "secondary" | 
     "success" | 
     "danger" | 
     "warning" | 
     "info" | 
     "dark" |
     "light"`,
    description: "Set contextual classes for the item"
}, {
    name: "href",
    type: "string",
    description: "Render the item as a element with href attribute"
}, {
    name: "equalWidth",
    type: "boolean",
    default: "false",
    description: "Equal-width list group items when horizontal"
}];

export default () => (
    <>
        <DocHeading>API</DocHeading>
        <PropsTable title="ListGroup" data={ListGroupProps}/>
        <PropsTable title="ListGroup.Item" data={ItemProps}/>
    </>
);