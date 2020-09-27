import * as React from "react"
import PropsTable from "../../PropsTable"
import NoAPI from "../../NoAPI"
import LangMsg from "../../Language/LanguageMessage"

const InputProps = [{
    name: "type",
    type: "string",
    default: "text",
    description: <LangMsg id="typeApi" />
}, {
    name: "prepend",
    type: "string | ReactNode",
    description: <LangMsg id="prependApi" />
}, {
    name: "append",
    type: "string | ReactNode",
    description: <LangMsg id="appendApi" />
}, {
    name: "sizing",
    type: "\"lg\" | \"sm\"",
    description: <LangMsg id="sizingApi" />
}, {
    name: "variant",
    type: "\"input\" | \"textarea\"",
    default: "input",
    description: <LangMsg id="variantApi" />
}, {
    name: "plaintext",
    type: "boolean",
    default: "false",
    description: <LangMsg id="plainTextApi" />
}]
const GroupProps = [{
    name: "size",
    type: "\"lg\" | \"sm\"",
    description: <LangMsg id="groupSizeApi" />
}]

export default () => (
    <>
        <PropsTable title="Input" data={InputProps} />
        <PropsTable title="Input.Group" data={GroupProps} />
        <NoAPI title="Input.Text"/>
    </>
)