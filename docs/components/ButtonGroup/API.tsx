import * as React from "react";
import PropsTable from "../PropsTable";

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
        <h2 className="doc-header">API</h2>
        <h3 className="doc-header">ButtonGroup</h3>
        <PropsTable data={ButtonGroupDoc}/>
        <h3 className="doc-header">ButtonToolbar</h3>
        <div className="text-muted">
            <em>No public props for this component.</em>
        </div>
    </>
);