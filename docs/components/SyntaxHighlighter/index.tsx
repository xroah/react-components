import * as React from "react";
import Highlighter from "react-syntax-highlighter/dist/esm/prism";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function SyntaxHighlighter(props: {code: string}) {

    return (
        <Highlighter
            language="javascript"
            style={tomorrow}>
            {props.code}
        </Highlighter>
    );

}