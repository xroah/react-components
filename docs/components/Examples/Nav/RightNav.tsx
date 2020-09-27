import * as React from "react"
import RightNav from "../../RightNav"
import LangMsg from "../../Language/LanguageMessage"

export const baseId = "baseNav"
export const baseTitle = <LangMsg id="baseTitle" />
export const styleId = "navAvailableStyles"
export const styleTitle = <LangMsg id="stylesTitle" />
export const haId = "horizontalAlignmentNav"
export const haTitle = <LangMsg id="haTitle" />
export const verticalId = "verticalNav"
export const verticalTitle = <LangMsg id="verticalTitle" />
export const tabsId = "tabsNav"
export const tabsTitle = <LangMsg id="tabsTitle" />
export const pillsId = "pillsNav"
export const pillsTitle = <LangMsg id="pillsTitle" />
export const fillId = "fillAndJustifyNav"
export const fillTitle = <LangMsg id="fillTitle" />
export const dropdownId = "usingDropdown"
export const dropdownTitle = <LangMsg id="dropdownTitle" />
export const tdId = "tabsWithDropdown"
export const tdTitle = <LangMsg id="tabsDropdownTitle" />
export const pdId = "pillsWithDropdown"
export const pdTitle = <LangMsg id="pollsDropdownTitle" />
export const apiId = "navApi"

export default () => (
    <RightNav data={[{
        name: baseTitle,
        href: `#${baseId}`
    }, {
        name: styleTitle,
        href: `#${styleId}`,
        children: [{
            name: haTitle,
            href: `#${haId}`
        }, {
            name: verticalTitle,
            href: `#${verticalId}`
        }, {
            name: tabsTitle,
            href: `#${tabsId}`
        }, {
            name: pillsTitle,
            href: `#${pillsId}`
        }, {
            name: fillTitle,
            href: `#${fillId}`
        }]
    }, {
        name: dropdownTitle,
        href: `#${dropdownId}`,
        children: [{
            name: tdTitle,
            href: `#${tdId}`
        }, {
            name: pdTitle,
            href: `#${pdId}`
        }]
    }, {
        name: "API",
        href: `#${apiId}`
    }]} />
)