import * as React from "react";
import PropsTable from "../../PropsTable";
import DocHeading from "../../DocHeading";
/* 

    value?: number;
    striped?: boolean;
    animated?: boolean;
    showLabel?: boolean;
*/
const props = [{
    name: "variant",
    type: `"primary" |
        "secondary" |
        "success" |
        "danger" |
        "warning" |
        "info" |
        "dark" |
        "light"`,
    description: "Background of the progress"
}, {
    name: "value",
    type: "number",
    default: "0",
    description: "Current value of the progress"
}, {
    name: "showLabel",
    type: "boolean",
    default: "false",
    description: "Add label within progress(current percentage)"
}, {
    name: "stripped",
    type: "boolean",
    default: "false",
    description: "Apply a stripe via CSS gradient over the progress bar’s background color"
}, {
    name: "animated",
    type: "boolean",
    default: "false",
    description: "To animate the stripes right to left via CSS3 animations"
}];

export default () => (
    <>
        <DocHeading>API</DocHeading>
        <PropsTable title="Progress" data={props}/>
    </>
);