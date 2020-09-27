import * as React from "react"
import PropsTable from "../../PropsTable"
import LangMsg from "../../Language/LanguageMessage"

const BadgeProps = [{
    name: "variant",
    type: `"primary" |
        "secondary" |
        "success" |
        "danger" |
        "warning" |
        "info" |
        "dark" |
        "light"`,
    description: <LangMsg id="varApi"/>
}, {
    name: "href",
    type: "string",
    description: <LangMsg id="hrefApi"/>
}, {
    name: "pill",
    type: "boolean",
    default: "false",
    description: <LangMsg id="pillApi"/>
}]

export default () => (
    <>
        <PropsTable title="Badge" data={BadgeProps}/>
    </>
)