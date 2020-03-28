import * as React from "react";
import PropsTable from "../../PropsTable";
import LangMsg from "../../Language/LanguageMessage";

const props = [{
    name: "title",
    type: "string | ReactNode",
    description: <LangMsg id="titleApi" />
}, {
    name: "img",
    type: "string | ReactNode",
    description: <LangMsg id="imgApi" />
}, {
    name: "imgAlt",
    type: "string",
    description: <LangMsg id="imgAltApi" />
}, {
    name: "imgTitle",
    type: "string",
    description: <LangMsg id="imgTitleApi" />
}, {
    name: "imgSize",
    type: "number",
    default: "64",
    description: <LangMsg id="imgSizeApi" />
}, {
    name: "imgBorder",
    type: `"rounded" | "circle"`,
    description: <LangMsg id="imgBorderApi" />
}, {
    name: "imgPosition",
    type: `"left" | "right"`,
    description: <LangMsg id="imgPosApi" />
}, {
    name: "alignment",
    type: `"top" | "middle" | "bottom"`,
    description: <LangMsg id="alignmentApi" />
}];

export default () => (
    <PropsTable title="Media" data={props} />
);