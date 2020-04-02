import * as React from "react";
import RightNav from "../../RightNav";
import LangMsg from "../../Language/LanguageMessage";

export const basicId = "modalBasicExample";
export const basicTitle = <LangMsg id="basicTitle" />;
export const staticId = "modalStaticBackdrop";
export const staticTitle = <LangMsg id="staticTitle" />;
export const scrollingId = "modalScrollingLongContent";
export const scrollingTitle = <LangMsg id="scrollingTitle" />;
export const verticalId = "modalVerticallyCentered";
export const verticalTitle = <LangMsg id="verticalTitle" />;
export const tapId = "modalTooltipsAndPopovers";
export const tapTitle = <LangMsg id="tapTitle" />;
export const noAnimId = "modalWithoutAnimation";
export const noAnimTitle = <LangMsg id="noAnimTitle" />;
export const sizeId = "modalOptionalSize";
export const sizeTitle = <LangMsg id="sizeTitle" />;
export const apiId = "modalApi";

export default () => (
    <RightNav data={[{
        name: basicTitle,
        href: `#${basicId}`
    },{
        name: staticTitle,
        href: `#${staticId}`
    },{
        name: scrollingTitle,
        href: `#${scrollingId}`
    },{
        name: verticalTitle,
        href: `#${verticalId}`
    },{
        name: tapTitle,
        href: `#${tapId}`
    },{
        name: noAnimTitle,
        href: `#${noAnimId}`
    },{
        name: sizeTitle,
        href: `#${sizeId}`
    },{
        name: "API",
        href: `#${apiId}`
    }]} />
)