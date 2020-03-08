import * as React from "react";
import PropsTable from "../../PropsTable";
import DocHeading from "../../DocHeading";
import NoAPI from "../../NoAPI";

const NavbarProps = [{
    name: "variant",
    type: "light | dark",
    default: "light",
    description: "Light or dark background"
}, {
    name: "bg",
    type: `primary |
        secondary |
        success |
        danger |
        warning |
        info |
        dark |
        light`,
    description: "Background of Navbar"
}, {
    name: "expand",
    type: `boolean | "sm" | "md" | "lg" | "xl"`,
    default: "false",
    description: "To change when their content collapses behind a button"
}];
const BrandProps = [{
    name: "tag",
    type: "string",
    default: "a",
    description: "Set a custom element for this component."
}, {
    name: "href",
    type: "string",
    description: "Href for underlying a element"
}];
const ToggleProps = [{
    name: "onClick",
    type: "Function",
    description: "Callback when toggle button is clicked"
}];

export default () => (
    <>
        <DocHeading>API</DocHeading>
        <PropsTable title="Navbar" data={NavbarProps} />
        <PropsTable title="Navbar.Brand" data={BrandProps} />
        <DocHeading tag="h3">Navbar.Collapse</DocHeading>
        <div>Same as Collapse component</div>
        <PropsTable title="Navbar.Toggle" data={ToggleProps}/>
        <NoAPI title="Navbar.Text" />
    </>
);