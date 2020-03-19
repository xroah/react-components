import * as React from "react";
import LangMsg from "../../Language/LanguageMessage";
import RightNav from "../../RightNav";

export const singleId = "singleButton";
export const singleTitle = <LangMsg id="singleTitle" />;
export const splitId = "splitButton";
export const splitTitle = <LangMsg id="splitTitle" />;
export const sizeId = "dropdownSizing";
export const sizeTitle = <LangMsg id="sizeTitle" />;
export const renderId = "customRender";
export const renderTitle = <LangMsg id="renderTitle" />;
export const dirId = "dropdownDirection";
export const dirTitle = <LangMsg id="dirTitle" />;
export const alignmentId = "dropdownAlignment";
export const alignmentTitle = <LangMsg id="alignmentTitle" />;
export const customId = "dropdownCustom";
export const customTitle = <LangMsg id="customTitle" />;
export const apiId = "dropdownApiId";

export default () => (
    <RightNav data={[{
        name: singleTitle,
        href: `#${singleId}`
    }, {
        name: splitTitle,
        href: `#${splitId}`
    }, {
        name: sizeTitle,
        href: `#${sizeId}`
    }, {
        name: renderTitle,
        href: `#${renderId}`
    }, {
        name: dirTitle,
        href: `#${dirId}`
    }, {
        name: alignmentTitle,
        href: `#${alignmentId}`
    }, {
        name: customTitle,
        href: `#${customId}`
    }, {
        name: "API",
        href: `#${apiId}`
    }]} />
);