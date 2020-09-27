import * as React from "react"
import PropsTable from "../../PropsTable"
import LangMsg from "../../Language/LanguageMessage"

const TabProps = [{
    name: "activeKey",
    type: "string",
    description: <LangMsg id="activeKeyApi" />
}, {
    name: "defaultActiveKey",
    type: "string",
    description: <LangMsg id="defaultActiveKeyApi" />
}, {
    name: "pill",
    type: "boolean",
    default: "false",
    description: <LangMsg id="pillsApi" />
}, {
    name: "fade",
    type: "boolean",
    default: "true",
    description: <LangMsg id="fadeApi" />
}, {
    name: "onTabChange",
    type: "Function(prevKey, currentKey)",
    description: <LangMsg id="onTabChangeApi" />
}, {
    name: "onTabClick",
    type: "Function(key, e)",
    description: <LangMsg id="onTabClickApi" />
}]
const TabPaneProps = [{
    name: "tab",
    type: "string | ReactNode",
    description: <LangMsg id="tabApi" />
}, {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: <LangMsg id="disabledApi" />
}, {
    name: "key",
    type: "string | number",
    description: <LangMsg id="keyApi" />
}]

export default () => (
    <>
        <PropsTable title="Tabs" data={TabProps}/>
        <PropsTable title="Tabs.TabPane" data={TabPaneProps}/>
    </>
)