import * as React from "react";
import PropsTable from "../PropsTable";
import DocHeading from "../DocHeading";

const props = [{
    name: "fluid",
    type: "boolean",
    default: "false",
    description: "To make the jumbotron full width, and without rounded corners"
}];

export default () => (
    <>
        <DocHeading>API</DocHeading>
        <PropsTable title="Jumbotron" data={props}/>
    </>
);