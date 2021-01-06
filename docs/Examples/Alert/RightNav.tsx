import * as React from "react"
import RightNav from "../../components/RightNav"
import LangMsg from "../../components/Language/LanguageMessage"

export const egId = "alertExamples"
export const lcId = "linkColor"
export const acId = "additionalContent"
export const dsId = "dismissing"
export const tgId = "toggle"
export const apiId = "alertApi"
export const egTitle = <LangMsg id="egTitle" />
export const lcTitle = <LangMsg id="lcTitle" />
export const acTitle = <LangMsg id="acTitle" />
export const dsTitle = <LangMsg id="dsTitle" />
export const tgTitle = <LangMsg id="tgTitle" />

export default () => (
    <RightNav data={[{
        name: egTitle,
        href: `#${egId}`
    }, {
        name: lcTitle,
        href: `#${lcId}`
    }, {
        name: acTitle,
        href: `#${acId}`
    }, {
        name: dsTitle,
        href: `#${dsId}`
    }, {
        name: tgTitle,
        href: `#${tgId}`
    }, {
        name: "API",
        href: `#${apiId}`
    }]} />
)