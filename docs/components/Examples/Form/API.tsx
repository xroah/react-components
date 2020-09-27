import * as React from "react"
import PropsTable from "../../PropsTable"
import LangMsg from "../../Language/LanguageMessage"

const FormProps = [{
    name: "Inline",
    type: "boolean",
    default: "false",
    description: <LangMsg id="inlineApi" />
}, {
    name: "labelCol",
    type: "object",
    description: <LangMsg id="labelColApi" />
}, {
    name: "wrapperCol",
    type: "object",
    description: <LangMsg id="wrapperColApi" />
}, {
    name: "horizontal",
    type: "boolean",
    default: "false",
    description: <LangMsg id="horizontalApi" />
}, {
    name: "labelAlign",
    type: "\"left\" | \"right\"",
    default: "left",
    description: <LangMsg id="labelAlignApi" />
}]
const FormItemProps = [{
    name: "horizontal",
    type: "boolean",
    default: "false",
    description: <LangMsg id="itemHApi" />
}, {
    name: "labelText",
    type: "string | ReactNode",
    description: <LangMsg id="itemLabelTextApi" />
}, {
    name: "label",
    type: "boolean",
    default: "true",
    description: <LangMsg id="itemLabelApi" />
}, {
    name: "labelCol",
    type: "object",
    description: <LangMsg id="itemLabelColApi" />
}, {
    name: "wrapperCol",
    type: "object",
    description: <LangMsg id="itemWrapperColApi" />
}, {
    name: "labelAlign",
    type: "\"left\" | \"right\"",
    default: "left",
    description: <LangMsg id="itemLabelAlignApi" />
}, {
    name: "htmlFor",
    type: "string",
    description: <LangMsg id="htmlForApi" />
}, {
    name: "help",
    type: "string | ReactNode",
    description: <LangMsg id="helpApi" />
}, {
    name: "control",
    type: "boolean",
    description: <LangMsg id="controlApi" />
}]
const CustomProps = [{
    name: "autoFocus",
    type: "boolean",
    default: "false",
    description: <LangMsg id="autoFocusApi" />
}, {
    name: "checked",
    type: "boolean",
    default: "false",
    description: <LangMsg id="checkedApi" />
}, {
    name: "defaultChecked",
    type: "boolean",
    default: "false",
    description: <LangMsg id="defaultCheckedApi" />
}, {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: <LangMsg id="disabledApi" />
}, {
    name: "onChange",
    type: "Function",
    description: <LangMsg id="onChangeApi" />
}, {
    name: "inline",
    type: "boolean",
    default: "false",
    description: <LangMsg id="customInlineApi" />
}]

export default () => (
    <>
        <PropsTable title="Form" data={FormProps}/>
        <PropsTable title="Form.Item" data={FormItemProps}/>
        <PropsTable title="Checkbox, Radio and Switch" data={CustomProps}/>
        <div><LangMsg id="noteDesc" /></div>
    </>
)