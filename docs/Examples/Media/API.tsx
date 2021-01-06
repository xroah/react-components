import * as React from "react"
import PropsTable from "../../components/PropsTable"
import LangMsg from "../../components/Language/LanguageMessage"

const props = [{
    name: "title",
    type: "string | ReactNode",
    description: <LangMsg id="titleApi" />
}, {
    name: "image",
    type: "ReactElement",
    description: <LangMsg id="imgApi" />
}, {
    name: "imgPosition",
    type: "\"left\" | \"right\"",
    description: <LangMsg id="imgPosApi" />
}, {
    name: "alignment",
    type: "\"top\" | \"middle\" | \"bottom\"",
    description: <LangMsg id="alignmentApi" />
}]

export default () => (
    <PropsTable title="Media" data={props} />
)