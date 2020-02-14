import * as React from "react";
import SyntaxHighlighter from "../SyntaxHighlighter";
import DocHeading from "../DocHeading";
import { classNames } from "../../../components/utils";

interface Props extends React.HTMLAttributes<HTMLElement> {
    component: React.ReactElement;
    source?: string;
}

export default function DemoExample(props: Props) {
    const {
        component,
        className,
        source,
        title,
        children
    } = props;

    return (
        <>
            {title && <DocHeading tag="h3">{title}</DocHeading>}
            {children}
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