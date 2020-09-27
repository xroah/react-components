import * as React from "react"
import SyntaxHighlighter from "../SyntaxHighlighter"
import { classNames } from "../../../components/utils"

interface Props extends React.HTMLAttributes<HTMLElement> {
    component: React.ReactElement;
    source?: string;
}

export default function DemoExample(props: Props) {
    const {
        component,
        className,
        source,
        children
    } = props

    return (
        <>
            {
                children && <div>{children}</div>
            }
            <div className={
                classNames(
                    className,
                    "bd-example"
                )
            }>
                <div>{component}</div>
                {
                    source &&
                    <SyntaxHighlighter code={source} />
                }
            </div>
        </>
    )
}