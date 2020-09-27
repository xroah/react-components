import * as React from "react"
import PropsTable from "../../PropsTable"
import LangMsg from "../../Language/LanguageMessage"

const CollapseProps = [{
    name: "isOpen",
    type: "boolean",
    description: <LangMsg id="isOpenApi" />
}, {
    name: "onShow",
    type: "Function",
    description: <LangMsg id="onShowApi" />
}, {
    name: "onShown",
    type: "Function",
    description: <LangMsg id="onShowApi" />
}, {
    name: "onHide",
    type: "Function",
    description: <LangMsg id="onHideApi" />
}, {
    name: "onHidden",
    type: "Function",
    description: <LangMsg id="onHiddenApi" />
}]
const AccordionProps = [{
    name: "activeKey",
    type: "string | number | string[] | number[]",
    description: <LangMsg id="activeKeyApi" />
}, {
    name: "defaultActiveKey",
    type: "string | number | string[] | number[]",
    description: <LangMsg id="defaultActiveKeyApi" />
}, {
    name: "multiple",
    type: "boolean",
    default: "false",
    description: <LangMsg id="multipleApi" />
}, {
    name: "onHeaderClick",
    type: "Function(key, e)",
    description: <LangMsg id="headerClickApi" />
}, {
    name: "onPanelChange",
    type: "Function(keys: key[])",
    description: <LangMsg id="panelChangeApi" />
}]
const PanelProps = [{
    name: "key",
    type: "string | number",
    description: <LangMsg id="keyApi" />
}, {
    name: "header",
    type: "string | ReactNode",
    description: <LangMsg id="headerApi" />
}]

export default () => (
    <>
        <PropsTable title="Collapse" data={CollapseProps} />
        <PropsTable title="Accordion" data={AccordionProps} />
        <PropsTable title="Accordion.Panel" data={PanelProps} />
    </>
)