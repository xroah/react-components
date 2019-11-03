import * as React from "react";
import Basic from "./Basic";
import SyntaxHighlighter from "../SyntaxHighlighter";
import PropsTable from "../PropsTable";

const BasicSrc = require("!!raw-loader!./Basic").default;

const breadcrumbDoc = [{
    name: "listProps",
    type: "string",
    default: "{}",
    description: "Additional props passed to the underlying ol element"
}];

const breadcrumbItemDoc = [{
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

export default function Breadcrumb() {
    return(
        <>
            <h2 className="doc-header">Example</h2>
            <div className="bd-example">
                <Basic/>
                <SyntaxHighlighter code={BasicSrc}/>
            </div>
            <h2 className="doc-header">API</h2>
            <h3>Breadcrumb</h3>
            <PropsTable data={breadcrumbDoc}/>
            <h3>Breadcrumb.Item</h3>
            <PropsTable data={breadcrumbItemDoc}/>
        </>
    );
}