import * as React from "react"
import RightNav from "../../components/RightNav"
import LangMsg from "../../components/Language/LanguageMessage"

export const borderId = "borderSpinner"
export const borderTitle = <LangMsg id="borderTitle" />
export const variantId = "spinnerVariants"
export const variantTitle = <LangMsg id="variantTitle" />
export const growingId = "growingSpinner"
export const growingTitle = <LangMsg id="growingTitle" />
export const sizeId = "spinnerSize"
export const sizeTitle = <LangMsg id="sizeTitle" />
export const btnId = "spinnerButton"
export const btnTitle = <LangMsg id="btnTitle" />
export const apiId = "spinnerApi"

export default () => (
    <RightNav data={[{
        name: borderTitle,
        href: `#${borderId}`
    }, {
        name: variantTitle,
        href: `#${variantId}`
    }, {
        name: growingTitle,
        href: `#${growingId}`
    }, {
        name: sizeTitle,
        href: `#${sizeId}`
    }, {
        name: btnTitle,
        href: `#${btnId}`
    }, {
        name: "API",
        href: `#${apiId}`
    }]} />
)