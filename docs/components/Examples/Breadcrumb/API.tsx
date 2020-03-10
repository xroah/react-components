import * as React from "react";
import PropsTable from "../../PropsTable";
import DocHeading from "../../DocHeading";
import NoAPI from "../../NoAPI";

const ItemProps = [{
    name: "active",
    type: "boolean",
    default: "false",
    description: `Active state for the Item and disables the link
    (Don't set both 'active' and 'href' props)`
}, {
    name: "href",
    type: "string",
    description: "Adds 'href' to the inner 'a' element"
}];

export default () => (
    <>
        <DocHeading>API</DocHeading>
        <NoAPI title="Breadcrumb" />
        <PropsTable title="Breadcrumb.Item" data={ItemProps} />
    </>
);