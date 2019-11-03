import * as React from "react";
import Basic from "./Basic";
import SyntaxHighlighter from "../SyntaxHighlighter";

const BasicSrc = require("!!raw-loader!./Basic").default;

export default function Breadcrumb() {
    return(
        <>
            <h2 className="doc-header">Example</h2>
            <div className="bd-example">
                <Basic/>
                <SyntaxHighlighter code={BasicSrc}/>
            </div>
        </>
    );
}