import * as React from "react";
import PropsTable from "../../PropsTable";
import DocHeading from "../../DocHeading";
import NoAPI from "../../NoAPI";

const NavProps = [{
    name: "variant",
    type: `"tab" | "pill"`,
    description: "Style as tab or pill"
}, {
    name: "vertical",
    type: "boolean",
    default: "false",
    description: "Stack your navigation vertically"
}, {
    name: "minWidth",
    type: `"sm" | "md" | "lg" | "xl"`,
    description: "Stack them vertically on some viewports but not others"
}, {
    name: "alignment",
    type: `"left" | "center" | "right"`,
    default: "left",
    description: "Change the horizontal alignment of nav"
}, {
    name: "fill",
    type: "boolean",
    default: "false",
    description: "Fill the full available width"
}, {
    name: "equalWidth",
    type: "boolean",
    default: "false",
    description: "Equal-width elements when fill"
}];
const LinkProps = [{
    name: "active",
    type: "boolean",
    default: "false",
    description: "Activate the link"
}, {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disable the link"
}, {
    name: "href",
    type: "sting",
    description: "Attribute for underlying 'a' element"
}];

export default () => (
    <>
        <DocHeading>API</DocHeading>
        <PropsTable title="Nav" data={NavProps}/>
        <NoAPI title="Nav.Item" />
        <PropsTable title="Nav.Link" data={LinkProps} />
    </>
);