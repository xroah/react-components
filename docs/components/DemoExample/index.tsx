import * as React from "react";
import SyntaxHighlighter from "../SyntaxHighlighter";
import DocHeading from "../DocHeading";
import { classNames } from "../../../components/utils";

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
    component: React.ReactElement;
    source?: string;
}

export default function DemoExample(props: Props) {
    const {
        component,
        className,
        source,
        title
    } = props;

    return (
        <>
            <DocHeading>{title}</DocHeading>
            <div className={
                classNames(
                    className,
                    "bd-example"
                )
            }>
                {component}
                {
                    source &&
                    <SyntaxHighlighter code={source} />
                }
            </div>
        </>
    );
};