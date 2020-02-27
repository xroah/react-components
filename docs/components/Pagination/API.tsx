import * as React from "react";
import PropsTable from "../PropsTable";
import DocHeading from "../DocHeading";

const props = [{
    name: "size",
    type: "sm | lg",
    description: "Size of pagination items"
}, {
    name: "alignment",
    type: "left | center | right",
    default: "left",
    description: "Alignment of pagination items"
}];
const itemProps = [{
    name: "active",
    type: "boolean",
    description: "Activate the item"
},{
    name: "disabled",
    type: "boolean",
    description: "Disable the item"
}];

export default () => (
    <>
        <DocHeading>API</DocHeading>
        <PropsTable title="Pagination" data={props}/>
        <PropsTable title="Pagination.Item" data={itemProps}/>
    </>
);