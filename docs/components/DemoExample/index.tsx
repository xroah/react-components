import * as React from "react";
import SyntaxHighlighter from "../SyntaxHighlighter";
import {classNames} from "../../../src/utils";

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
    component: React.ReactElement;
    source?: string;
}

export default function DemoExample(props: Props) {
    const {
        component,
        className,
        source
    } = props;

    return (
        <div className={
            classNames(
                className,
                "bd-example"
            )
        }>
            {React.cloneElement(component)}
            {
                source &&
                    <SyntaxHighlighter code={source}/>
            }
        </div>
    );
};