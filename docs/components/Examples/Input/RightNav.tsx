import * as React from "react"
import RightNav from "../../RightNav"
import LangMsg from "../../Language/LanguageMessage"

export const egId = "inputBasicExample"
export const egTitle = <LangMsg id="basicTitle" />
export const readonlyId = "readonlyInput"
export const readonlyTitle = <LangMsg id="readonlyTitle" />
export const plainId = "plainTextInput"
export const plainTitle = <LangMsg id="plainTitle" />
export const sizingId = "inputSizing"
export const sizingTitle = <LangMsg id="sizingTitle" />
export const multiInputsId = "multipleInputs"
export const multiInputsTitle = <LangMsg id="multiInputsTitle" />
export const multiInputsDesc = <LangMsg id="multiInputsDesc" />
export const multiAddonsId = "multipleAddons"
export const multiAddonsTitle = <LangMsg id="multiAddonsTitle" />
export const btnId = "btnAddons"
export const btnTitle = <LangMsg id="btnTitle" />
export const dropdownId = "btnWithDropdowns"
export const dropdownTitle = <LangMsg id="dropdownTitle" />
export const apiId = "inputApi"

export default () => (
    <RightNav data={[{
        name: egTitle,
        href: `#${egId}`
    }, {
        name: readonlyTitle,
        href: `#${readonlyId}`
    }, {
        name: plainTitle,
        href: `#${plainId}`
    }, {
        name: sizingTitle,
        href: `#${sizingId}`
    }, {
        name: multiInputsTitle,
        href: `#${multiInputsId}`
    }, {
        name: multiAddonsTitle,
        href: `#${multiAddonsId}`
    }, {
        name: btnTitle,
        href: `#${btnId}`
    }, {
        name: dropdownTitle,
        href: `#${dropdownId}`
    }, {
        name: "API",
        href: `#${apiId}`
    }]} />
)