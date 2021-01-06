import * as React from "react"
import DocHeading from "../../../components/DocHeading"
import DemoExample from "../../../components/DemoExample"
import EqualWidth from "./EqualWidth"
import EqualWidthSrc from "!!raw-loader!./EqualWidth"
import OneColumnWidth from "./OneColumnWidth"
import OneColumnWidthSrc from "!!raw-loader!./OneColumnWidth"
import VariableWidthContent from "./VariableWidthContent"
import VariableWidthContentSrc from "!!raw-loader!./VariableWidthContent"
import MixAndMatch from "./MixAndMatch"
import MixAndMatchSrc from "!!raw-loader!./MixAndMatch"
import RowColumns from "./RowColumns"
import RowColumnsSrc from "!!raw-loader!./RowColumns"
import RowColumns2 from "./RowColumns2"
import RowColumns2Src from "!!raw-loader!./RowColumns2"
import RowColumns3 from "./RowColumns3"
import RowColumns3Src from "!!raw-loader!./RowColumns3"
import VerticalAlignment from "./VerticalAlignment"
import VerticalAlignmentSrc from "!!raw-loader!./VerticalAlignment"
import VerticalAlignment2 from "./VerticalAlignment2"
import VerticalAlignment2Src from "!!raw-loader!./VerticalAlignment2"
import HorizontalAlignment from "./HorizontalAlignment"
import HorizontalAlignmentSrc from "!!raw-loader!./HorizontalAlignment"
import Order from "./Order"
import OrderSrc from "!!raw-loader!./Order"
import Offset from "./Offset"
import OffsetSrc from "!!raw-loader!./Offset"
import LangMsg from "../../../components/Language/LanguageMessage"
import {
    gridId,
    gridTitle,
    equalId,
    equalTitle,
    oneColWidthId,
    oneColWidthTitle,
    variableContentId,
    variableContentTitle,
    mixId,
    mixTitle,
    rowColId,
    rowColTitle,
    alignmentId,
    alignmentTitle,
    verticalId,
    verticalTitle,
    noGuttersId,
    noGuttersTitle,
    horizontalId,
    horizontalTitle,
    reorderingId,
    reorderingTitle,
    offsetId,
    offsetTitle
} from "../RightNav"

const { H3 } = DocHeading

export default () => (
    <>
        <DocHeading id={gridId}>{gridTitle}</DocHeading>
        <div><LangMsg id="gridDesc" /></div>
        <H3 id={equalId}>{equalTitle}</H3>
        <DemoExample
            className="bd-example-row"
            component={<EqualWidth />}
            source={EqualWidthSrc}>
            <LangMsg id="equalDesc" />
        </DemoExample>
        <H3 id={oneColWidthId}>{oneColWidthTitle}</H3>
        <DemoExample
            className="bd-example-row"
            component={<OneColumnWidth />}
            source={OneColumnWidthSrc}>
            <LangMsg id="oneColWidthDesc" />
        </DemoExample>
        <H3 id={variableContentId}>{variableContentTitle}</H3>
        <DemoExample
            className="bd-example-row"
            component={<VariableWidthContent />}
            source={VariableWidthContentSrc}>
            <LangMsg id="variableContentDesc" />
        </DemoExample>
        <H3 id={mixId}>{mixTitle}</H3>
        <DemoExample
            className="bd-example-row"
            component={<MixAndMatch />}
            source={MixAndMatchSrc}>
            <LangMsg id="mixDesc" />
        </DemoExample>
        <H3 id={rowColId}>{rowColTitle}</H3>
        <DemoExample
            className="bd-example-row"
            component={<RowColumns />}
            source={RowColumnsSrc}>
            <LangMsg id="rowColDesc" />
        </DemoExample>
        <DemoExample
            className="bd-example-row"
            component={<RowColumns2 />}
            source={RowColumns2Src} />
        <DemoExample
            className="bd-example-row"
            component={<RowColumns3 />}
            source={RowColumns3Src} />
        <H3 id={alignmentId}>{alignmentTitle}</H3>
        <div><LangMsg id="alignmentDesc" /></div>
        <H3 id={verticalId}>{verticalTitle}</H3>
        <DemoExample
            className="bd-example-row"
            component={<VerticalAlignment />}
            source={VerticalAlignmentSrc} />
        <DemoExample
            className="bd-example-row"
            component={<VerticalAlignment2 />}
            source={VerticalAlignment2Src} />
        <H3 id={horizontalId}>{horizontalTitle}</H3>
        <DemoExample
            className="bd-example-row"
            component={<HorizontalAlignment />}
            source={HorizontalAlignmentSrc} />
        <H3 id={noGuttersId}>{noGuttersTitle}</H3>
        <div><LangMsg id="noGuttersDesc" /></div>
        <H3 id={reorderingId}>{reorderingTitle}</H3>
        <DemoExample
            className="bd-example-row"
            component={<Order />}
            source={OrderSrc}>
            <LangMsg id="reorderingDesc" />
        </DemoExample>
        <H3 id={offsetId}>{offsetTitle}</H3>
        <DemoExample
            className="bd-example-row"
            component={<Offset />}
            source={OffsetSrc}>
            <LangMsg id="offsetDesc" />
        </DemoExample>
    </>
)