import * as React from "react";
import RightNav from "../../RightNav";
import LangMsg from "../../Language/LanguageMessage";

export const containerId = "layoutContainer";
export const containerTitle = <LangMsg id="containerTitle" />;
export const allId = "containerAllInOne";
export const allTitle = <LangMsg id="allTitle" />;
export const fluidId = "containerFluid";
export const fluidTitle = <LangMsg id="fluidTitle" />;
export const resId = "responsiveContainer";
export const resTitle = <LangMsg id="resTitle" />;
export const gridId = "layoutGrid";
export const gridTitle = <LangMsg id="gridTitle" />;
export const equalId = "layoutEqualWidthGrid";
export const equalTitle = <LangMsg id="equalTitle" />;
export const oneColWidthId = "settingOneColWidth";
export const oneColWidthTitle = <LangMsg id="oneColWidthTitle" />;
export const variableContentId = "variableContent";
export const variableContentTitle = <LangMsg id="variableContentTitle" />;
export const mixId = "mixAndMatch";
export const mixTitle = <LangMsg id="mixTitle" />;
export const rowColId = "rowColumns";
export const rowColTitle = <LangMsg id="rowColTitle" />;
export const alignmentId = "layoutAlignment";
export const alignmentTitle = <LangMsg id="alignmentTitle" />;
export const verticalId = "layoutVerticalAlignment";
export const verticalTitle = <LangMsg id="verticalTitle" />;
export const horizontalId = "layoutHorizontalAlignment";
export const horizontalTitle = <LangMsg id="horizontalTitle" />;
export const noGuttersId = "noGutters";
export const noGuttersTitle = <LangMsg id="noGuttersTitle" />;
export const reorderingId = "layoutReordering";
export const reorderingTitle = <LangMsg id="reorderingTitle" />;
export const offsetId = "layoutOffset";
export const offsetTitle = <LangMsg id="offsetTitle" />;
export const apiId = "layoutApi";

export default () => (
    <RightNav data={[{
        name: containerTitle,
        href: `#${containerId}`,
        children: [{
            name: allTitle,
            href: `#${allId}`
        }, {
            name: fluidTitle,
            href: `#${fluidId}`
        }, {
            name: resTitle,
            href: `#${resId}`
        }]
    }, {
        name: gridTitle,
        href: `#${gridId}`,
        children: [{
            name: equalTitle,
            href: `#${equalId}`
        }, {
            name: oneColWidthTitle,
            href: `#${oneColWidthId}`
        }, {
            name: variableContentTitle,
            href: `#${variableContentId}`
        }, {
            name: mixTitle,
            href: `#${mixId}`
        }, {
            name: rowColTitle,
            href: `#${rowColId}`
        }, {
            name: alignmentTitle,
            href: `#${alignmentId}`
        }, {
            name: verticalTitle,
            href: `#${verticalId}`
        }, {
            name: horizontalTitle,
            href: `#${horizontalId}`
        }, {
            name: noGuttersTitle,
            href: `#${noGuttersId}`
        }, {
            name: reorderingTitle,
            href: `#${reorderingId}`
        }, {
            name: offsetTitle,
            href: `#${offsetId}`
        }]
    }, {
        name: "API",
        href: `#${apiId}`
    }]} />
);