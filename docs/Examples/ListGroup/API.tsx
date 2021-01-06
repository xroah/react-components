import * as React from "react"
import PropsTable from "../../components/PropsTable"
import LangMsg from "../../components/Language/LanguageMessage"

const ListGroupProps = [{
    name: "horizontal",
    type: "boolean",
    default: "false",
    description: <LangMsg id="horizontalApi" />
}, {
    name: "flush",
    type: "boolean",
    default: "false",
    description: <LangMsg id="flushApi" />
}, {
    name: "minWidth",
    type: "\"sm\" | \"md\" | \"lg\" | \"xl\"",
    description: <LangMsg id="minWidthApi" />
}, {
    name: "equalWidth",
    type: "boolean",
    default: "false",
    description: <LangMsg id="equalWithApi" />
}]
const ItemProps = [{
    name: "active",
    type: "boolean",
    default: "false",
    description: <LangMsg id="activeApi" />
}, {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: <LangMsg id="disabledApi" />
}, {
    name: "action",
    type: "boolean",
    default: "false",
    description: <LangMsg id="actionApi" />
}, {
    name: "variant",
    type: `"primary" |
     "secondary" | 
     "success" | 
     "danger" | 
     "warning" | 
     "info" | 
     "dark" |
     "light"`,
    description: <LangMsg id="variantApi" />
}, {
    name: "href",
    type: "string",
    description: <LangMsg id="hrefApi" />
}]

export default () => (
    <>
        <PropsTable title="ListGroup" data={ListGroupProps}/>
        <PropsTable title="ListGroup.Item" data={ItemProps}/>
    </>
)