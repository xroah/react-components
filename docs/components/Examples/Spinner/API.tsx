import * as React from "react";
import PropsTable from "../../PropsTable";
import LangMsg from "../../Language/LanguageMessage";

const props = [{
    name: "animation",
    type: `"border" | "grow"`,
    description: <LangMsg id="animApi" />
}, {
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
    name: "size",
    type: `"sm" | number`,
    description: <LangMsg id="sizeApi" />
}, {
    name: "borderWidth",
    type: "number",
    description: <LangMsg id="borderWidthApi" />
}];

export default () => (
    <PropsTable title="Spinner" data={props}/>
);