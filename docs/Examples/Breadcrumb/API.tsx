import * as React from "react"
import PropsTable from "../../components/PropsTable"
import NoAPI from "../../components/NoAPI"
import LangMsg from "../../components/Language/LanguageMessage"

const ItemProps = [{
    name: "active",
    type: "boolean",
    default: "false",
    description: <LangMsg id="activeApi"/>
}, {
    name: "href",
    type: "string",
    description: <LangMsg id="hrefApi"/>
}]

export default () => (
    <>
        <NoAPI title="Breadcrumb" />
        <PropsTable title="Breadcrumb.Item" data={ItemProps} />
    </>
)