import * as React from "react";
import PropsTable from "../../PropsTable";
import DocHeading from "../../DocHeading";

const props = [{
    name: "animation",
    type: `"border" | "grow"`,
    description: "Animation style of spinners"
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
    description: "The color of the spinner"
}, {
    name: "size",
    type: `"sm" | number`,
    description: "Size of spinners"
}, {
    name: "borderWidth",
    type: "number",
    description: "Border width for border spinners"
}];

export default () => (
    <>
        <DocHeading>API</DocHeading>
        <PropsTable title="Spinner" data={props}/>
    </>
);