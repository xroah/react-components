import * as React from "react";
import DocHeading from "../../DocHeading";
import DemoExample from "../../DemoExample";
import Basic from "./Basic";
import BasicSrc from "!!raw-loader!./Basic";
import Static from "./Static";
import StaticSrc from "!!raw-loader!./Static";
import Centered from "./Centered";
import CenteredSrc from "!!raw-loader!./Centered";
import Tooltip from "./Tooltip";
import TooltipSrc from "!!raw-loader!./Tooltip";
import LongContent from "./LongContent";
import LongContentSrc from "!!raw-loader!./LongContent";
import Scrollable from "./Scrollable";
import ScrollableSrc from "!!raw-loader!./Scrollable";
import WithoutFade from "./WithoutFade";
import WithoutFadeSrc from "!!raw-loader!./WithoutFade";
import Size from "./Size";
import SizeSrc from "!!raw-loader!./Size";
import API from "./API";
import Main from "../../Main";
import LangProvider from "../../Language/LanguageProvider";
import LangMsg from "../../Language/LanguageMessage";
import lang from "./lang";
import RightNav, {
    basicId,
    basicTitle,
    staticId,
    staticTitle,
    scrollingId,
    scrollingTitle,
    verticalId,
    verticalTitle,
    tapId,
    tapTitle,
    noAnimId,
    noAnimTitle,
    sizeId,
    sizeTitle,
    apiId
} from "./RightNav";

const { H3 } = DocHeading;

export default () => (
    <LangProvider language={lang}>
        <Main>
            <DocHeading>Dialog</DocHeading>
            <div><LangMsg id="compDesc" /></div>
            <H3 id={basicId}>{basicTitle}</H3>
            <DemoExample
                component={<Basic />}
                source={BasicSrc}>
                <LangMsg id="basicDesc" />
            </DemoExample>
            <H3 id={staticId}>{staticTitle}</H3>
            <DemoExample
                component={<Static />}
                source={StaticSrc}>
                <LangMsg id="staticDesc" />
            </DemoExample>
            <H3 id={scrollingId}>{scrollingTitle}</H3>
            <DemoExample
                component={<LongContent />}
                source={LongContentSrc}>
                <LangMsg id="scrollingDesc" />
            </DemoExample>
            <DemoExample
                component={<Scrollable />}
                source={ScrollableSrc}>
                <LangMsg id="scrollingDesc2" />
            </DemoExample>
            <H3 id={verticalId}>{verticalTitle}</H3>
            <DemoExample
                component={<Centered />}
                source={CenteredSrc}>
                <LangMsg id="verticalDesc" />
            </DemoExample>
            <H3 id={tapId}>{tapTitle}</H3>
            <DemoExample
                component={<Tooltip />}
                source={TooltipSrc}>
                <LangMsg id="tapDesc" />
            </DemoExample>
            <H3 id={noAnimId}>{noAnimTitle}</H3>
            <DemoExample
                component={<WithoutFade />}
                source={WithoutFadeSrc}>
                <LangMsg id="noAnimDesc" />
            </DemoExample>
            <H3 id={sizeId}>{sizeTitle}</H3>
            <DemoExample
                component={<Size />}
                source={SizeSrc}>
                <LangMsg id="sizeDesc" />
            </DemoExample>
            <DocHeading id={apiId}>API</DocHeading>
            <API />
        </Main>
        <RightNav />
    </LangProvider>
);