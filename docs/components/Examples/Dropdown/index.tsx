import * as React from "react"
import DocHeading from "../../DocHeading"
import DemoExample from "../../DemoExample"
import Main from "../../Main"
import SingleButton from "./SingleButton"
import SingleButtonSrc from "!!raw-loader!./SingleButton"
import SplitButton from "./SplitButton"
import SplitButtonSrc from "!!raw-loader!./SplitButton"
import Sizing from "./Sizing"
import SizingSrc from "!!raw-loader!./Sizing"
import Render from "./Render"
import RenderSrc from "!!raw-loader!./Render"
import Directions from "./Directions"
import DirectionSrc from "!!raw-loader!./Directions"
import Alignment from "./Alignment"
import AlignmentSrc from "!!raw-loader!./Alignment"
import Custom from "./Custom"
import CustomSrc from "!!raw-loader!./Custom"
import API from "./API"
import LangProvider from "../../Language/LanguageProvider"
import LangMsg from "../../Language/LanguageMessage"
import lang from "./lang"
import RightNav, {
    singleId,
    singleTitle,
    splitId,
    splitTitle,
    sizeId,
    sizeTitle,
    renderId,
    renderTitle,
    dirId,
    dirTitle,
    alignmentId,
    alignmentTitle,
    customId,
    customTitle,
    apiId
} from "./RightNav"

const { H3 } = DocHeading

export default () => (
    <LangProvider language={lang}>
        <Main>
            <DocHeading>Overview</DocHeading>
            <div><LangMsg id="compDesc" /></div>
            <H3 id={singleId}>{singleTitle}</H3>
            <DemoExample
                component={<SingleButton />}
                source={SingleButtonSrc} />
            <H3 id={splitId}>{splitTitle}</H3>
            <DemoExample
                component={<SplitButton />}
                source={SplitButtonSrc} />
            <H3 id={sizeId}>{sizeTitle}</H3>
            <DemoExample
                className="dropdown-demo"
                component={<Sizing />}
                source={SizingSrc}>
                <LangMsg id="sizeDesc" />
            </DemoExample>
            <H3 id={renderId}>{renderTitle}</H3>
            <DemoExample
                component={<Render />}
                source={RenderSrc} />
            <H3 id={dirId}>{dirTitle}</H3>
            <DemoExample
                className="dropdown-demo"
                component={<Directions />}
                source={DirectionSrc}>
                <LangMsg id="dirDesc" />
            </DemoExample>
            <H3 id={alignmentId}>{alignmentTitle}</H3>
            <DemoExample
                component={<Alignment />}
                source={AlignmentSrc}>
                <LangMsg id="alignmentDesc" />
            </DemoExample>
            <H3 id={customId}>{customTitle}</H3>
            <DemoExample
                component={<Custom />}
                source={CustomSrc} />
            <DocHeading id={apiId}>API</DocHeading>
            <API />
        </Main>
        <RightNav />
    </LangProvider>
)