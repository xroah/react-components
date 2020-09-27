import * as React from "react"
import RightNav from "../../RightNav"
import LangMsg from "../../Language/LanguageMessage"

export const basicId = "basicPagination"
export const basicTitle = <LangMsg id="basicTitle" />
export const stateId = "paginationDisabledAndActiveState"
export const stateTitle = <LangMsg id="stateTitle" />
export const sizingId = "paginationSizing"
export const sizingTitle = <LangMsg id="sizingTitle" />
export const alignmentId = "paginationAlignment"
export const alignmentTitle = <LangMsg id="alignmentTitle" />
export const apiId = "paginationAPI"

export default () => (
    <RightNav data={[{
        name: basicTitle,
        href: `#${basicId}`
    }, {
        name: stateTitle,
        href: `#${stateId}`
    }, {
        name: sizingTitle,
        href: `#${sizingId}`
    }, {
        name: alignmentTitle,
        href: `#${alignmentId}`
    }, {
        name: "API",
        href: `#${apiId}`
    }]} />
)