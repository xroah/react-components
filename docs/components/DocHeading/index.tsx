import * as React from "react";
import {classNames} from "../../../components/utils";

interface Props extends React.HTMLAttributes<HTMLHeadingElement>{
    tag?: string;
}

export default function DocHeading(props: Props) {
    const {
        tag = "h2",
        className,
        ...otherProps
    } = props;

    return React.createElement(
        tag,
        {
            className: classNames(className, "doc-heading"),
            ...otherProps
        }
    )
};

DocHeading.H3 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <DocHeading tag="h3" {...props}/>
);

