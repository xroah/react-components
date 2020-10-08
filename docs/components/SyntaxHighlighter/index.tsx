import * as React from "react"
import Highlighter from "react-syntax-highlighter/dist/esm/prism"
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism"

export default function SyntaxHighlighter(props: { code: string }) {
    const { code } = props
    const handleClick = function handleClick() {
        navigator.clipboard.writeText(code)
    }
    return (
        <>
            <div className="position-relative">
                <button className="btn-clipboard" onClick={handleClick}>copy</button>
            </div>
            <div className="code-container">
                <Highlighter
                    language="javascript"
                    style={tomorrow}>
                    {code}
                </Highlighter>
            </div>
        </>
    )

}