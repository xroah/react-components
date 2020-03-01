import * as React from "react";
import DocHeading from "../DocHeading";
import PropsTable from "../PropsTable";

const props = [{
    name: "visible",
    type: "boolean",
    default: "false",
    description: "Visibility of toasts"
}, {
    name: "closable",
    type: "boolean",
    default: "true",
    description: "Show close button or not on the top right"
}, {
    name: "title",
    type: "string | ReactNode",
    description: "Toast title"
}, {
    name: "extra",
    type: "string | ReactNode",
    description: "An extra message on the top right"
}, {
    name: "icon",
    type: "string | ReactNode",
    description: "An image on the top left"
}, {
    name: "iconSize",
    type: "number",
    default: "20",
    description: "Icon size"
}, {
    name: "autoHide",
    type: "boolean",
    default: "false",
    description: "Hide the toast automatically after a delay once show"
}, {
    name: "delay",
    type: "number",
    default: "3000",
    description: "A millisecond number for autoHide"
}, {
    name: "fade",
    type: "boolean",
    default: "true",
    description: "Enable fade animation when showing or hiding"
}, {
    name: "header",
    type: "string | ReactNode",
    description: "Customize the header for toasts(set null if you don't want to show the header)"
}, {
    name: "onClose",
    type: "Function",
    description: "Callback when the close button is clicked"
}];

export default () => (
    <>
        <DocHeading>API</DocHeading>
        <PropsTable title="Toast" data={props} />
    </>
);