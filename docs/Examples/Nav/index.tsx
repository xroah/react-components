import * as React from "react"
import DocHeading from "../../components/DocHeading"
import DemoExample from "../../components/DemoExample"
import Basic from "./Basic"
import BasicSrc from "!!raw-loader!./Basic"
import Center from "./Center"
import CenterSrc from "!!raw-loader!./Center"
import Right from "./Right"
import RightSrc from "!!raw-loader!./Right"
import Vertical from "./Vertical"
import VerticalSrc from "!!raw-loader!./Vertical"
import Tabs from "./Tabs"
import TabsSrc from "!!raw-loader!./Tabs"
import Pill from "./Pill"
import PillSrc from "!!raw-loader!./Pill"
import Fill from "./Fill"
import FillSrc from "!!raw-loader!./Fill"
import Justify from "./Justify"
import JustifySrc from "!!raw-loader!./Justify"
import TabDropdown from "./TabDropdown"
import TabDropdownSrc from "!!raw-loader!./TabDropdown"
import PillDropdown from "./PillDropdown"
import PillDropdownSrc from "!!raw-loader!./PillDropdown"
import API from "./API"
import Main from "../../components/Main"
import LangProvider from "../../components/Language/LanguageProvider"
import LangMsg from "../../components/Language/LanguageMessage"
import lang from "./lang"
import RightNav, {
    baseId,
    baseTitle,
    styleId,
    styleTitle,
    haId,
    haTitle,
    verticalId,
    verticalTitle,
    tabsId,
    tabsTitle,
    pillsId,
    pillsTitle,
    fillId,
    fillTitle,
    dropdownId,
    dropdownTitle,
    tdId,
    tdTitle,
    pdId,
    pdTitle,
    apiId
} from "./RightNav"

const { H3 } = DocHeading

export default () => (
    <LangProvider language={lang}>
        <Main>
            <DocHeading>Nav</DocHeading>
            <LangMsg id="compDesc" />
            <H3 id={baseId}>{baseTitle}</H3>
            <DemoExample
                component={<Basic />}
                source={BasicSrc}>
                <LangMsg id="baseDesc" />
            </DemoExample>
            <DocHeading id={styleId}>{styleTitle}</DocHeading>
            <H3 id={haId}>{haTitle}</H3>
            <DemoExample
                component={<Center />}
                source={CenterSrc}>
                <LangMsg id="haDesc" />
            </DemoExample>
            <DemoExample
                component={<Right />}
                source={RightSrc} />
            <H3 id={verticalId}>{verticalTitle}</H3>
            <DemoExample
                component={<Vertical />}
                source={VerticalSrc}>
                <LangMsg id="verticalDesc" />
            </DemoExample>
            <H3 id={tabsId}>{tabsTitle}</H3>
            <DemoExample
                component={<Tabs />}
                source={TabsSrc}>
                <LangMsg id="tabsDesc" />
            </DemoExample>
            <H3 id={pillsId}>{pillsTitle}</H3>
            <DemoExample
                component={<Pill />}
                source={PillSrc}>
                <LangMsg id="pillsDesc" />
            </DemoExample>
            <H3 id={fillId}>{fillTitle}</H3>
            <DemoExample
                component={<Fill />}
                source={FillSrc}>
                <LangMsg id="" />
            </DemoExample>
            <DemoExample
                component={<Justify />}
                source={JustifySrc}>
                <LangMsg id="justifyDesc" />
            </DemoExample>
            <DocHeading id={dropdownId}>{dropdownTitle}</DocHeading>
            <LangMsg id="dropdownDesc" />
            <H3 id={tdId}>{tdTitle}</H3>
            <DemoExample
                component={<TabDropdown />}
                source={TabDropdownSrc} />
            <H3 id={pdId}>{pdTitle}</H3>
            <DemoExample
                component={<PillDropdown />}
                source={PillDropdownSrc} />
            <DocHeading id={apiId}>API</DocHeading>
            <API />
        </Main>
        <RightNav />
    </LangProvider>
)