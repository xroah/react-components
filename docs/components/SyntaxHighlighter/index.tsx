import * as React from "react";
import Highlighter from "react-syntax-highlighter/dist/esm/prism";
import {tomorrow} from "react-syntax-highlighter/dist/esm/styles/prism";

export default function SyntaxHighlighter(props: { code: any }) {
    const { code } = props;
    const handleClick = function handleClick() {
        const input = document.createElement("input");
        input.value = code;
        document.body.append(input);
        input.select();
        document.execCommand("copy");
        input.remove();
    }
    return (
        <div className="position-relative" style={{marginTop: 10}}>
            <Highlighter
                language="javascript"
                style={tomorrow}>
                {code}
            </Highlighter>
            <button className="btn-clipboard" onClick={handleClick}>copy</button>
        </div>
    );

}