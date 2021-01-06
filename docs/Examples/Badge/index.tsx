import * as React from "react"
import DemoExample from "../../components/DemoExample"
import DocHeading from "../../components/DocHeading"
import Main from "../../components/Main"
import ScaleMatch from "./ScaleMatch"
import ScaleMathSrc from "!!raw-loader!./ScaleMatch"
import Contextual from "./Contextual"
import ContextualSrc from "!!raw-loader!./Contextual"
import Pill from "./Pill"
import PillSrc from "!!raw-loader!./Pill"
import Link from "./Link"
import LinkSrc from "!!raw-loader!./Link"
import ButtonCounter from "./ButtonCounter"
import ButtonCounterSrc from "!!raw-loader!./ButtonCounter"
import API from "./API"
import LangProvider from "../../components/Language/LanguageProvider"
import LangMsg from "../../components/Language/LanguageMessage"
import RightNav, {
    egId,
    egTitle,
    varId,
    varTitle,
    pillId,
    pillTitle,
    linkId,
    linkTitle,
    apiId
} from "./RightNav"
import lang from "./lang"

const { H3 } = DocHeading

export default () => (
    <LangProvider language={lang}>
        <Main>
            <DocHeading>Badge</DocHeading>
            <div>
                <LangMsg id="compDesc" />
            </div>
            <H3 id={egId}>{egTitle}</H3>
            <DemoExample
                component={<ScaleMatch />}
                source={ScaleMathSrc}>
                <div><LangMsg id="egDesc" /></div>
            </DemoExample>
            <DemoExample component={<ButtonCounter />} source={ButtonCounterSrc}>
                <div><LangMsg id="counterDesc" /></div>
            </DemoExample>
            <div><LangMsg id="note" /></div>
            <H3 id={varId}>{varTitle}</H3>
            <DemoExample
                className="badge-demo"
                component={<Contextual />}
                source={ContextualSrc}>
                <LangMsg id="varDesc" />
            </DemoExample>
            <H3 id={pillId}>{pillTitle}</H3>
            <DemoExample
                className="badge-demo"
                component={<Pill />}
                source={PillSrc} >
                <LangMsg id="pillDesc" />
            </DemoExample>
            <H3 id={linkId}>{linkTitle}</H3>
            <DemoExample
                className="badge-demo"
                component={<Link />}
                source={LinkSrc}>
                <LangMsg id="linkDesc" />
            </DemoExample>
            <DocHeading id={apiId}>API</DocHeading>
            <API />
        </Main>
        <RightNav />
    </LangProvider>
)