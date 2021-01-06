import * as React from "react"
import RightNav from "../../components/RightNav"
import LangMsg from "../../components/Language/LanguageMessage"

export const egTitle = <LangMsg id="egTitle" />
export const varTitle = <LangMsg id="varTitle" />
export const pillTitle = <LangMsg id="pillTitle" />
export const linkTitle = <LangMsg id="linkTitle" />
export const egId = "badgeExample"
export const varId = "contextualVariations"
export const pillId = "pillBadges"
export const linkId = "links"
export const apiId = "badgeApi"

export default () => (
    <RightNav data={[
        {
            name: egTitle,
            href: `#${egId}`
        }, {
            name: varTitle,
            href: `#${varId}`
        }, {
            name: pillTitle,
            href: `#${pillId}`
        }, {
            name: linkTitle,
            href: `#${linkId}`
        }, {
            name: "API",
            href: `#${apiId}`
        }
    ]} />
)