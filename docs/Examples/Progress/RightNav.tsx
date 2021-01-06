import * as React from "react"
import RightNav from "../../components/RightNav"
import LangMsg from "../../components/Language/LanguageMessage"

export const egId = "progressBasicExample"
export const egTitle = <LangMsg id="egTitle" />
export const labelsId = "progressLabels"
export const labelsTitle = <LangMsg id="labelsTitle" />
export const heightId = "progressHeight"
export const heightTitle = <LangMsg id="heightTitle" />
export const bgId = "progressBackground"
export const bgTitle = <LangMsg id="bgTitle" />
export const multiId = "multiProgresses"
export const multiTitle = <LangMsg id="multiTitle" />
export const stripedId = "stripedProgress"
export const stripedTitle = <LangMsg id="stripedTitle" />
export const animId = "animatedProgress"
export const animTitle = <LangMsg id="animTitle" />
export const apiId = "progressApi"

export default () => (
    <RightNav data={[{
        name: egTitle,
        href: `#${egId}`
    }, {
        name: labelsTitle,
        href: `#${labelsId}`
    }, {
        name: heightTitle,
        href: `#${heightId}`
    }, {
        name: bgTitle,
        href: `#${bgId}`
    }, {
        name: multiTitle,
        href: `#${multiId}`
    }, {
        name: stripedTitle,
        href: `#${stripedId}`
    }, {
        name: animTitle,
        href: `#${animId}`
    }, {
        name: "API",
        href: `#${apiId}`
    }]} />
)