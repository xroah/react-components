import * as React from "react";
import RightNav from "../../RightNav";
import LangMsg from "../../Language/LanguageMessage";

export const egId = "inputBasicExample";
export const egTitle = <LangMsg id="basicTitle" />;
export const readonlyId = "readonlyInput";
export const readonlyTitle = <LangMsg id="readonlyTitle" />;
export const plainId = "plainTextInput";
export const plainTitle = <LangMsg id="plainTitle" />;
export const sizingId = "inputSizing";
export const sizingTitle = <LangMsg id="sizingTitle" />;
export const multiInputId = "multipleInputs";
export const multiInputTitle = <LangMsg id="multiTitle" />;
export const multiAddonId = "multipleAddons";
export const multiAddonTitle = <LangMsg id="multiAddonTitle" />;
export const btnId = "btnAddons";
export const btnTitle = <LangMsg id="btnTitle" />;
export const dropdownId = "btnWithDropdowns";
export const dropdownTitle = <LangMsg id="dropdownTitle" />;
export const apiId = "inputApi";

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
        name: multiInputTitle,
        href: `#${multiInputId}`
    }, {
        name: multiAddonTitle,
        href: `#${multiAddonId}`
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
);