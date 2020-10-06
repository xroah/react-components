import * as React from "react"
import RightNav from "../../RightNav"
import LangMsg from "../../Language/LanguageMessage"

export const basicId = "formBasicExample"
export const basicTitle = <LangMsg id="basicTitle" />
export const gridId = "formGrid"
export const gridTitle = <LangMsg id="gridTitle" />
export const rowId = "formRow"
export const rowTitle = <LangMsg id="rowTitle" />
export const horizontalId = "horizontalForm"
export const horizontalTitle = <LangMsg id="horizontalTitle" />
export const inlineId = "inlineForm"
export const inlineTitle = <LangMsg id="inlineTitle" />
export const validationId = "formValidation"
export const validationTitle = "Validation"
export const checkboxId = "checkboxes"
export const checkboxTitle = <LangMsg id="checkboxTitle" />
export const radioId = "radios"
export const radioTitle = <LangMsg id="radioTitle" />
export const switchId = "switches"
export const switchTitle = <LangMsg id="switchTitle" />
export const apiId = "formApi"

export default () => (
    <RightNav data={[{
        name: basicTitle,
        href: `#${basicId}`
    }, {
        name: gridTitle,
        href: `#${gridId}`
    }, {
        name: rowTitle,
        href: `#${rowId}`
    }, {
        name: horizontalTitle,
        href: `#${horizontalId}`
    }, {
        name: inlineTitle,
        href: `#${inlineId}`
    }, {
        name: validationTitle,
        href: `#${validationId}`
    },{
        name: checkboxTitle,
        href: `#${checkboxId}`
    }, {
        name: radioTitle,
        href: `#${radioId}`
    }, {
        name: switchTitle,
        href: `#${switchId}`
    }, {
        name: "API",
        href: `#${apiId}`
    }]} />
)