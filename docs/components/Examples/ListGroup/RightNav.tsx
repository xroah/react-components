import * as React from "react";
import RightNav from "../../RightNav";
import LangMsg from "../../Language/LanguageMessage";

export const basicId = "listGroupBasicExample";
export const basicTitle = <LangMsg id="basicTitle" />;
export const aodId = "listGroupActiveOrDisabled";
export const aodTitle = <LangMsg id="aodTitle" />;
export const actionId = "ListGroupAction";
export const actionTitle = <LangMsg id="actionTitle" />;
export const flushId = "listGroupFlush";
export const flushTitle = <LangMsg id="flushTitle" />;
export const horizontalId = "listGroupHorizontal";
export const horizontalTitle = <LangMsg id="horizontalTitle" />;
export const ccId = "listGroupContextualClasses";
export const ccTitle = <LangMsg id="ccTitle" />;
export const tabId = "listGroupTab";
export const tabTitle = <LangMsg id="tabTitle" />;
export const apiId = "listGroupApi";

export default () => (
    <RightNav data={[{
        name: basicTitle,
        href: `#${basicId}`
    }, {
        name: aodTitle,
        href: `#${aodId}`
    }, {
        name: flushTitle,
        href: `#${flushId}`
    }, {
        name: horizontalTitle,
        href: `#${horizontalId}`
    }, {
        name: ccTitle,
        href: `#${ccId}`
    }, {
        name: tabTitle,
        href: `#${tabId}`
    }, {
        name: "API",
        href: `#${apiId}`
    }]} />
);