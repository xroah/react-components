import * as React from "react"
import RightNav from "../../RightNav"
import LangMsg from "../../Language/LanguageMessage"

export const egId = "example"
export const egTitle = <LangMsg id="egTitle" />
export const obId = "outlineButtons"
export const obTitle = <LangMsg id="obTitle" />
export const sizeId = "sizes"
export const sizeTitle = <LangMsg id="sizeTitle" />
export const acId = "activeState"
export const acTitle = <LangMsg id="acTitle" />
export const dsId = "disabledState"
export const dsTitle = <LangMsg id="dsTitle" />
export const carId = "checkboxAndRadios"
export const carTitle = <LangMsg id="carTitle" />
export const groupId = "buttonGroup"
export const tbId = "buttonToolbar"
export const tbTitle = <LangMsg id="tbTitle" />
export const groupSizeId = "buttonGroupSizing"
export const groupSizeTitle = <LangMsg id="groupSizeTitle" />
export const nestingId = "nesting"
export const nestingTitle = <LangMsg id="nestingTitle" />
export const verticalId = "vertical"
export const verticalTitle = <LangMsg id="verticalTitle" />
export const btnApiId = "btnApi"

export default () => (
    <RightNav data={[{
        name: egTitle,
        href: `#${egId}`
    }, {
        name: obTitle,
        href: `#${obId}`
    }, {
        name: sizeTitle,
        href: `#${sizeId}`
    }, {
        name: acTitle,
        href: `#${acId}`
    }, {
        name: dsTitle,
        href: `#${dsId}`
    }, {
        name: carTitle,
        href: `#${carId}`
    }, {
        name: "Button group",
        href: `#${groupId}`,
        children: [{
            name: tbTitle,
            href: `#${tbId}`
        }, {
            name: groupSizeTitle,
            href: `#${groupSizeId}`
        }, {
            name: nestingTitle,
            href: `#${nestingId}`
        }, {
            name: verticalTitle,
            href: `#${verticalId}`
        }]
    }, {
        name: "API",
        href: `#${btnApiId}`
    }]} />
)