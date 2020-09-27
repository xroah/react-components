import * as React from "react"
import PropsTable from "../../PropsTable"
import LangMsg from "../../Language/LanguageMessage"

const props = [{
    name: "fluid",
    type: "boolean",
    default: "false",
    description: <LangMsg id="fluidApi" />
}]

export default () => (
    <>
        <PropsTable title="Jumbotron" data={props} />
    </>
)