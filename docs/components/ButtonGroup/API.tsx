import * as React from "react";
import PropsTable from "../PropsTable";
import DocHeading from "../DocHeading";
import NoAPI from "../NoAPI";

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
        <DocHeading tag="h3">Button.Group</DocHeading>
        <PropsTable data={ButtonGroupDoc}/>
        <DocHeading tag="h3">Button.Toolbar</DocHeading>
        <NoAPI/>
    </>
);