import * as React from "react";
import PropsTable from "../PropsTable";
import DocHeading from "../DocHeading";

const ButtonGroupDoc = [{
    name: "size",
    type: "'sm' | 'lg'",
    description: "Set the size in the group of Buttons"
}, {
    name: "vertical",
    type: "boolean",
    default: "false",
    description: "Make a set of buttons appear vertically stacked rather than horizontally. "
}];

export default () => (
    <>
        <DocHeading>API</DocHeading>
        <DocHeading tag="h3">ButtonGroup</DocHeading>
        <PropsTable data={ButtonGroupDoc}/>
        <DocHeading tag="h3">ButtonToolbar</DocHeading>
        <div className="text-muted">
            <em>No public props for this component.</em>
        </div>
    </>
);