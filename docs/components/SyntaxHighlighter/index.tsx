import * as React from "react";
import Highlighter from "react-syntax-highlighter/dist/esm/prism";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function SyntaxHighlighter(props: { code: any }) {
    const { code } = props;
    const handleClick = function handleClick() {
        const textarea = document.createElement("textarea");
        textarea.value = code;
        textarea.style.cssText = `position: absolute; left: -10000px;`;
        document.body.append(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
    }
    return (
        <>
            <div className="position-relative">
                <button className="btn-clipboard" onClick={handleClick}>copy</button>
            </div>
            <div className="code-container" style={{ marginTop: 10 }}>
                <Highlighter
                    language="javascript"
                    style={tomorrow}>
                    {code}
                </Highlighter>
            </div>
        </>
    );

}