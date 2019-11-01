import * as React from "react";
import Basic from "./Basic";
import Dismissable, {default as Dismissible} from "./Dismissible";
import Toggle from "./Toggle";
import SyntaxHighlighter from "../SyntaxHighlighter";

const BasicString = require("!!raw-loader!./Basic");

export default class AlertDemo extends React.Component {

    render() {
        return (
            <>
                <h2>Examples</h2>
                <div className="bd-example">
                    <Basic/>
                    {/*<SyntaxHighlighter code={BasicString.default}/>*/}
                    <Dismissible/>
                    <Toggle/>
                </div>
            </>
        );
    }

}