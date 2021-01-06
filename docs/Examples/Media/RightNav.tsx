import * as React from "react"
import RightNav from "../../components/RightNav"
import LangMsg from "../../components/Language/LanguageMessage"

export const egId = "mediaObjectExample"
export const egTitle = <LangMsg id="egTitle" />
export const nestingId = "nestingMediaObject"
export const nestingTitle = <LangMsg id="nestingTitle" />
export const alignmentId = "mediaObjectAlignment"
export const alignmentTitle = <LangMsg id="alignmentTitle" />
export const apiId = "mediaObjectApi"

export default () => (
    <RightNav data={[{
        name: egTitle,
        href: `#${egId}`
    }, {
        name: nestingTitle,
        href: `#${nestingId}`
    }, {
        name: alignmentTitle,
        href: `#${alignmentId}`
    }, {
        name: "API",
        href: `#${apiId}`
    }]} />
)