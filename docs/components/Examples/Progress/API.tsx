import * as React from "react";
import PropsTable from "../../PropsTable";
import LangMsg from "../../Language/LanguageMessage";

const props = [{
    name: "variant",
    type: `"primary" |
        "secondary" |
        "success" |
        "danger" |
        "warning" |
        "info" |
        "dark" |
        "light"`,
    description: <LangMsg id="variantApi" />
}, {
    name: "value",
    type: "number",
    default: "0",
    description: <LangMsg id="valueApi" />
}, {
    name: "showLabel",
    type: "boolean",
    default: "false",
    description: <LangMsg id="showLabelApi" />
}, {
    name: "stripped",
    type: "boolean",
    default: "false",
    description: <LangMsg id="stripedApi" />
}, {
    name: "animated",
    type: "boolean",
    default: "false",
    description: <LangMsg id="animatedApi" />
}];

export default () => (
    <>
        <PropsTable title="Progress" data={props}/>
    </>
);