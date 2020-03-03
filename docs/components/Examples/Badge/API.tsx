import * as React from "react";
import PropsTable from "../../PropsTable";
import DocHeading from "../../DocHeading";

const BadgeProps = [{
    name: "variant",
    type: `"primary" |
        "secondary" |
        "success" |
        "danger" |
        "warning" |
        "info" |
        "dark" |
        "light"`,
    default: "",
    description: "Appearance of a Badge"
}, {
    name: "href",
    type: "string",
    default: "",
    description: "Render as 'a' tag with href if passed"
}, {
    name: "pill",
    type: "boolean",
    default: "false",
    description: "Make badges more rounded (with a larger border-radius and additional horizontal padding)"
}];

export default () => (
    <>
        <DocHeading>API</DocHeading>
        <PropsTable title="Badge" data={BadgeProps}/>
    </>
);