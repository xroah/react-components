import * as React from "react";
import PropsTable from "../../PropsTable";
import LangMsg from "../../Language/LanguageMessage";
import NoAPI from "../../NoAPI";

const NavProps = [{
    name: "variant",
    type: `"tab" | "pill"`,
    description: <LangMsg id="variantApi" />
}, {
    name: "vertical",
    type: "boolean",
    default: "false",
    description: <LangMsg id="verticalApi" />
}, {
    name: "minWidth",
    type: `"sm" | "md" | "lg" | "xl"`,
    description: <LangMsg id="minWidthApi" />
}, {
    name: "alignment",
    type: `"left" | "center" | "right"`,
    default: "left",
    description: <LangMsg id="alignmentApi" />
}, {
    name: "fill",
    type: "boolean",
    default: "false",
    description: <LangMsg id="fillApi" />
}, {
    name: "equalWidth",
    type: "boolean",
    default: "false",
    description: <LangMsg id="equalWidthApi" />
}];
const LinkProps = [{
    name: "active",
    type: "boolean",
    default: "false",
    description: <LangMsg id="activeApi" />
}, {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: <LangMsg id="disabledApi" />
}, {
    name: "href",
    type: "sting",
    description: <LangMsg id="hrefApi" />
}];

export default () => (
    <>
        <PropsTable title="Nav" data={NavProps}/>
        <NoAPI title="Nav.Item" />
        <PropsTable title="Nav.Link" data={LinkProps} />
    </>
);