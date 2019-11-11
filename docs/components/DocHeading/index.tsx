import * as React from "react";
import {classNames} from "../../../src/utils";

interface Props extends React.HTMLAttributes<HTMLHeadingElement>{
    tag?: string;
}

export default function DocHeading(props: Props) {
    const {
        tag = "h2",
        className,
        children } = props;

    return React.createElement(
        tag,
        {
            className: classNames(className, "doc-heading")
        },
        children
    )
};

