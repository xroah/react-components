import * as React from "react"
import RightNav from "../../RightNav"
import LangMsg from "../../Language/LanguageMessage"

export const egId = "navbarExample"
export const egTitle = <LangMsg id="egTitle" />
export const supportedId = "navbarSupportedContent"
export const supportedTitle = <LangMsg id="supportedTitle" />
export const brandId = "navbarBrand"
export const brandTitle = <LangMsg id="brandTitle" />
export const textId = "navbarText"
export const textTitle = <LangMsg id="textTitle" />
export const colorId = "navbarColor"
export const colorTitle = <LangMsg id="colorTitle" />
export const resId = "navbarResponsiveBehavior"
export const resTitle = <LangMsg id="resTitle" />
export const togglerId = "navbarToggler"
export const togglerTitle = <LangMsg id="togglerTitle" />
export const externalId = "navbarExternalContent"
export const externalTitle = <LangMsg id="externalTitle" />
export const apiId = "navbarApi"

export default () => (
    <RightNav data={[{
        name: egTitle,
        href: `#${egId}`
    }, {
        name: supportedTitle,
        href: `#${supportedId}`,
        children: [{
            name: brandTitle,
            href: `#${brandId}`
        }, {
            name: textTitle,
            href: `#${textId}`
        }, {
            name: colorTitle,
            href: `#${colorId}`
        } ]
    }, {
        name: resTitle,
        href: `#${resId}`,
        children: [{
            name: togglerTitle,
            href: `#${togglerId}`
        }, {
            name: externalTitle,
            href: `#${externalId}`
        }]
    }, {
        name: "API",
        href: `#${apiId}`
    }]} />
)
