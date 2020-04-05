import * as React from "react";
import PropsTable from "../../PropsTable";
import LangMsg from "../../Language/LanguageMessage";
import NoAPI from "../../NoAPI";
import { Link } from "react-router-dom";
import DocHeading from "../../DocHeading";

const NavbarProps = [{
    name: "variant",
    type: "light | dark",
    default: "light",
    description: <LangMsg id="variantApi" />
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
    description: <LangMsg id="bgApi" />
}, {
    name: "expand",
    type: `boolean | "sm" | "md" | "lg" | "xl"`,
    default: "false",
    description: <LangMsg id="expandApi" />
}];
const BrandProps = [{
    name: "tag",
    type: "string",
    default: "a",
    description: <LangMsg id="tagApi" />
}, {
    name: "href",
    type: "string",
    description: <LangMsg id="hrefApi" />
}];
const ToggleProps = [{
    name: "onClick",
    type: "Function",
    description: <LangMsg id="onClickApi" />
}];

export default () => (
    <>
        <PropsTable title="Navbar" data={NavbarProps} />
        <PropsTable title="Navbar.Brand" data={BrandProps} />
        <DocHeading.H3>Navbar.Collapse</DocHeading.H3>
        <div>
            <LangMsg id="seeDesc" />
            <Link to="/components/collapse#collapseApi">Collapse</Link>
        </div>
        <PropsTable title="Navbar.Toggle" data={ToggleProps}/>
        <NoAPI title="Navbar.Text" />
    </>
);