import * as React from "react";
import SyntaxHighlighter from "../SyntaxHighlighter";
import Basic from "./Basic";
import ButtonToolbar from "./ButtonToolbar";
import Sizing from "./Sizing"
import Vertical from "./Vertical";
import API from "./API";

const BasicSrc = require("!!raw-loader!./Basic").default;
const ButtonToolbarSrc = require("!!raw-loader!./ButtonToolbar").default;
const SizingSrc = require("!!raw-loader!./Sizing").default;
const VerticalSrc = require("!!raw-loader!./Vertical").default;

export default () => (
    <>
        <h2 className="doc-header">Basic</h2>
        <div className="bd-example">
            <Basic/>
            <SyntaxHighlighter code={BasicSrc}/>
        </div>
        <h2 className="doc-header">Button toolbar</h2>
        <div className="bd-example">
            <ButtonToolbar/>
            <SyntaxHighlighter code={ButtonToolbarSrc}/>
        </div>
        <h2 className="doc-header">Sizing</h2>
        <div className="bd-example">
            <Sizing/>
            <SyntaxHighlighter code={SizingSrc}/>
        </div>
        <h2 className="doc-header">Nesting</h2>
        <div className="bd-example">
            coming soon
        </div>
        <h2 className="doc-header">Vertical</h2>
        <div className="bd-example">
            <Vertical/>
            <SyntaxHighlighter code={VerticalSrc}/>
        </div>
        <API/>
    </>
);