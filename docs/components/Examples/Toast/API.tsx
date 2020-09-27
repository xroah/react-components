import * as React from "react"
import LangMsg from "../../Language/LanguageMessage"
import PropsTable from "../../PropsTable"

const props = [{
    name: "visible",
    type: "boolean",
    default: "false",
    description: <LangMsg id="visibleApi" />
}, {
    name: "closable",
    type: "boolean",
    default: "true",
    description: <LangMsg id="closableApi" />
}, {
    name: "title",
    type: "string | ReactNode",
    description: <LangMsg id="titleApi" />
}, {
    name: "extra",
    type: "string | ReactNode",
    description: <LangMsg id="extraApi" />
}, {
    name: "icon",
    type: "string | ReactNode",
    description: <LangMsg id="iconApi" />
}, {
    name: "iconSize",
    type: "number",
    default: "20",
    description: <LangMsg id="iconSizeApi" />
}, {
    name: "autoHide",
    type: "boolean",
    default: "false",
    description: <LangMsg id="autoHideApi" />
}, {
    name: "delay",
    type: "number",
    default: "3000",
    description: <LangMsg id="delayApi" />
}, {
    name: "fade",
    type: "boolean",
    default: "true",
    description: <LangMsg id="fadeApi" />
}, {
    name: "header",
    type: "string | ReactNode",
    description: <LangMsg id="headerApi" />
}, {
    name: "onClose",
    type: "Function",
    description: <LangMsg id="onCloseApi" />
}, {
    name: "onShow",
    type: "Function",
    description: <LangMsg id="onShowApi" />
}, {
    name: "onShown",
    type: "Function",
    description: <LangMsg id="onShownApi" />
}, {
    name: "onHide",
    type: "Function",
    description: <LangMsg id="onHideApi" />
}, {
    name: "onHidden",
    type: "Function",
    description: <LangMsg id="onHiddenApi" />
}]

export default () => (
    <PropsTable title="Toast" data={props} />
)