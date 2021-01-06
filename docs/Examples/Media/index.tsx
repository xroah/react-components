import * as React from "react"
import DocHeading from "../../components/DocHeading"
import DemoExample from "../../components/DemoExample"
import Basic from "./Basic"
import BasicSrc from "!!raw-loader!./Basic"
import Nest from "./Nest"
import NestSrc from "!!raw-loader!./Nest"
import Alignment from "./Alignment"
import AlignmentSrc from "!!raw-loader!./Alignment"
import API from "./API"
import Main from "../../components/Main"
import LangProvider from "../../components/Language/LanguageProvider"
import LangMsg from "../../components/Language/LanguageMessage"
import lang from "./lang"
import RightNav, {
    egId,
    egTitle,
    nestingTitle,
    nestingId,
    alignmentTitle,
    alignmentId,
    apiId
} from "./RightNav"

export default () => (
    <LangProvider language={lang}>
        <Main>
            <DocHeading>Media object</DocHeading>
            <div><LangMsg id="compDesc" /></div>
            <DocHeading.H3 id={egId}>{egTitle}</DocHeading.H3>
            <DemoExample
                component={<Basic />}
                source={BasicSrc} />
            <DocHeading.H3 id={nestingId}>{nestingTitle}</DocHeading.H3>
            <DemoExample
                component={<Nest />}
                source={NestSrc}>
                <LangMsg id="nestingDesc" />
            </DemoExample>
            <DocHeading.H3 id={alignmentId}>{alignmentTitle}</DocHeading.H3>
            <DemoExample
                component={<Alignment />}
                source={AlignmentSrc}>
                <LangMsg id="alignmentDesc" />
            </DemoExample>
            <DocHeading id={apiId}>API</DocHeading>
            <API />
        </Main>
        <RightNav />
    </LangProvider>
)