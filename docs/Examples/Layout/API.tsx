import * as React from "react"
import PropsTable from "../../components/PropsTable"
import LangMsg from "../../components/Language/LanguageMessage"

const ContainerProps = [{
    name: "variant",
    type: "\"fluid\" | \"sm\" | \"md\" | \"lg\" | 'xl'",
    description: <LangMsg id="variantApi" />
}]
const RowProps = [{
    name: "noGutters",
    type: "boolean",
    default: "false",
    description: <LangMsg id="noGuttersApi" />
}, {
    name: "alignment",
    type: "\"start\" | \"center\" | \"end\"",
    description: <LangMsg id="rowAlignmentApi" />
}, {
    name: "justify",
    type: "\"start\" | \"center\" | \"end\" | \"around\" | \"between\"",
    description: <LangMsg id="justifyApi" />
}, {
    name: "form",
    type: "boolean",
    default: "false",
    description: <LangMsg id="formApi" />
}, {
    name: "cols",
    type: "number | object({default?: number, sm?: number, md?: number, lg?: number, xl?: number})",
    description: <LangMsg id="colsApi" />
}]
const breakpoint = "number | boolean | \"auto\" | object({span?: \"auto\" | boolean | number, offset?: number, order?: number})"
const ColProps = [{
    name: "alignment",
    type: "\"start\" | \"center\" | \"end\"",
    description: <LangMsg id="colAlignmentApi" />
}, {
    name: "span",
    type: "number | \"auto\" | boolean",
    default: "true",
    description: <LangMsg id="spanApi" />
}, {
    name: "order",
    type: "number",
    description: <LangMsg id="orderApi" />
}, {
    name: "offset",
    type: "number",
    description:<LangMsg id="offsetApi" />
}, {
    name: "sm",
    type: breakpoint,
    description: <LangMsg id="smApi" />
}, {
    name: "md",
    type: breakpoint,
    description: <LangMsg id="mdApi" />
}, {
    name: "lg",
    type: breakpoint,
    description: <LangMsg id="lgApi" />
}, {
    name: "xl",
    type: breakpoint,
    description: <LangMsg id="xlApi" />
}]

export default () => (
    <>
        <PropsTable title="Container" data={ContainerProps} />
        <PropsTable title="Row" data={RowProps} />
        <PropsTable title="Col" data={ColProps} />
    </>
)