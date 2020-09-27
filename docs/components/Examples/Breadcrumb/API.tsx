import * as React from "react"
import PropsTable from "../../PropsTable"
import NoAPI from "../../NoAPI"
import LangMsg from "../../Language/LanguageMessage"

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