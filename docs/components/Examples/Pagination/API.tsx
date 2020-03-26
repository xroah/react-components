import * as React from "react";
import PropsTable from "../../PropsTable";
import LangMsg from "../../Language/LanguageMessage";

const props = [{
    name: "size",
    type: `"sm" | "lg"`,
    description: <LangMsg id="sizeApi" />
}, {
    name: "alignment",
    type: `"left" | "center" | "right"`,
    default: "left",
    description: <LangMsg id="alignmentApi" />
}];
const itemProps = [{
    name: "active",
    type: "boolean",
    description: <LangMsg id="activeApi" />
},{
    name: "disabled",
    type: "boolean",
    description: <LangMsg id="disabledApi" />
}];

export default () => (
    <>
        <PropsTable title="Pagination" data={props}/>
        <PropsTable title="Pagination.Item" data={itemProps}/>
    </>
);