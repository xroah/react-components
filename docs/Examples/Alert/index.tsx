import * as React from "react"
import DocHeading from "../../components/DocHeading"
import DemoExample from "../../components/DemoExample"
import Main from "../../components/Main"
import Basic from "./Basic"
import BasicSrc from "!!raw-loader!./Basic"
import Dismissible from "./Dismissible"
import DismissibleSrc from "!!raw-loader!./Dismissible"
import Toggle from "./Toggle"
import ToggleSrc from "!!raw-loader!./Toggle"
import Link from "./Link"
import LinkSrc from "!!raw-loader!./Link"
import AdditionalContent from "./AdditionalContent"
import AdditionalContentSrc from "!!raw-loader!./AdditionalContent"
import API from "./API"
import LangProvider from "../../components/Language/LanguageProvider"
import LangMsg from "../../components/Language/LanguageMessage"
import lang from "./lang"
import RightNav, {
    egId,
    egTitle,
    lcId,
    lcTitle,
    acId,
    acTitle,
    dsId,
    dsTitle,
    tgId,
    tgTitle,
    apiId
} from "./RightNav"

const { H3 } = DocHeading

export default () => (
    <LangProvider language={lang}>
        <Main>
            <DocHeading>Alert</DocHeading>
            <div>
                <LangMsg id="compDesc" />
            </div>
            <H3 id={egId}>{egTitle}</H3>
            <DemoExample component={<Basic />} source={BasicSrc}>
                <LangMsg id="egDesc" />
            </DemoExample>
            <H3 id={lcId}>{lcTitle}</H3>
            <DemoExample component={<Link />} source={LinkSrc}>
                <LangMsg id="lcDesc" />
            </DemoExample>
            <H3 id={acId}>{acTitle}</H3>
            <DemoExample
                component={<AdditionalContent />}
                source={AdditionalContentSrc}>
                <LangMsg id="acDesc" />
            </DemoExample>
            <H3 id={dsId}>{dsTitle}</H3>
            <DemoExample component={<Dismissible />} source={DismissibleSrc} />
            <H3 id={tgId}>{tgTitle}</H3>
            <DemoExample component={<Toggle />} source={ToggleSrc} />
            <DocHeading id={apiId}>API</DocHeading>
            <API />
        </Main>
        <RightNav />
    </LangProvider>
)