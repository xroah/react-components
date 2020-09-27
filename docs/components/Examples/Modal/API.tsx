import * as React from "react"
import PropsTable from "../../PropsTable"
import LangMsg from "../../Language/LanguageMessage"

const props = [{
    name: "visible",
    type: "boolean",
    default: "false",
    description: <LangMsg id="visibleApi" />
}, {
    name: "title",
    type: "string | ReactNode",
    description:<LangMsg id="titleApi" />
}, {
    name: "closable",
    type: "boolean",
    default: "true",
    description:<LangMsg id="closableApi" />
}, {
    name: "showOk",
    type: "boolean",
    default: "true",
    description: <LangMsg id="showOkApi" />
}, {
    name: "showCancel",
    type: "boolean",
    default: "true",
    description: <LangMsg id="showCancelApi" />
}, {
    name: "okText",
    type: "string | ReactNode",
    default: "确定",
    description:<LangMsg id="okTextApi" />
}, {
    name: "cancelText",
    type: "string | ReactNode",
    default: "取消",
    description: <LangMsg id="cancelTextApi" />
}, {
    name: "okType",
    type: "same as variant of button",
    default: "primary",
    description: <LangMsg id="okTypeApi" />
}, {
    name: "cancelType",
    type: "same as variant of button",
    default: "light",
    description: <LangMsg id="cancelType" />
}, {
    name: "keyboard",
    type: "boolean",
    default: "true",
    description: <LangMsg id="keyboardApi" />
}, {
    name: "forceRender",
    type: "boolean",
    default: "false",
    description:<LangMsg id="forceRenderApi" />
}, {
    name: "fade",
    type: "boolean",
    default: "true",
    description: <LangMsg id="fadeApi" />
}, {
    name: "centered",
    type: "boolean",
    default: "false",
    description: <LangMsg id="centeredApi" />
}, {
    name: "size",
    type: "\"xl\" | \"lg\" | \"sm\"",
    description: <LangMsg id="sizeAPi" />
}, {
    name: "autoFocus",
    type: "boolean",
    default: "true",
    description: <LangMsg id="autoFocusApi" />
}, {
    name: "scrollable",
    type: "boolean",
    default: "false",
    description: <LangMsg id="scrollableApi" />
}, {
    name: "backdrop",
    type: "boolean | \"static\"",
    default: "true",
    description: <LangMsg id="backdropApi" />
}, {
    name: "header",
    type: "string | ReactNode",
    description: <LangMsg id="headerApi" />
}, {
    name: "footer",
    type: "string | ReactNode",
    description: <LangMsg id="footerApi" />
}, {
    name: "onOk",
    type: "Function(e)",
    description: <LangMsg id="onOkApi" />
}, {
    name: "onCancel",
    type: "Function(e)",
    description: <LangMsg id="onCancelApi" />
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
    <PropsTable title="Modal" data={props} />
)