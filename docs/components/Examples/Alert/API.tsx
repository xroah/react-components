import * as React from "react"
import PropsTable from "../../PropsTable"
import NoAPI from "../../NoAPI"
import LangMsg from "../../Language/LanguageMessage"

const AlertProps = [{
    name: "variant",
    type: `"primary" |
        "secondary" |
        "success" |
        "danger" |
        "warning" |
        "info" |
        "dark" |
        "light"`,
    default: "",
    description: <LangMsg id="variantApi"/>
}, {
    name: "Fade",
    type: "boolean",
    default: "true",
    description: <LangMsg id="fadeApi"/>
}, {
    name: "visible",
    type: "boolean",
    default: "true",
    description: <LangMsg id="visibleApi"/>
}, {
    name: "heading",
    type: "string | ReactNode",
    description: <LangMsg id="headingApi"/>
}, {
    name: "dismissible",
    type: "boolean",
    default: "false",
    description: <LangMsg id="dismissApi"/>
}, {
    name: "onClose",
    type: "Function",
    description: <LangMsg id="onCloseApi"/>
}, {
    name: "onClosed",
    type: "Function",
    description: <LangMsg id="onClosedApi"/>
}]

export default () => (
    <>
        <PropsTable title="Alert" data={AlertProps} />
        <NoAPI title="Alert.Link" />
    </>
)