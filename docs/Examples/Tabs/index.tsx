import * as React from "react"
import DocHeading from "../../components/DocHeading"
import DemoExample from "../../components/DemoExample"
import Basic from "./Basic"
import BasicSrc from "!!raw-loader!./Basic"
import Pills from "./Pills"
import PillsSrc from "!!raw-loader!./Pills"
import WithoutAnimation from "./WithoutAnimation"
import WithoutAnimationSrc from "!!raw-loader!./WithoutAnimation"
import Custom from "./Custom"
import CustomSrc from "!!raw-loader!./Custom"
import API from "./API"
import Main from "../../components/Main"
import RightNav from "../../components/RightNav"
import LangProvider from "../../components/Language/LanguageProvider"
import LangMsg from "../../components/Language/LanguageMessage"
import lang from "./lang"

const { H3 } = DocHeading

const basicId = "tabBasicExample"
const basicTitle = <LangMsg id="basicTitle" />
const pillsId = "pillsTab"
const pillsTitle = <LangMsg id="pillsTitle" />
const noAnimId = "tabWithoutAnimation"
const noAnimTitle = <LangMsg id="noAnimTitle" />
const customId = "tabCustomization"
const customTitle = <LangMsg id="customTitle" />
const apiId = "tabApi"

export default () => (
    <LangProvider language={lang}>
        <Main>
            <DocHeading>Tabs</DocHeading>
            <div><LangMsg id="compDesc" /></div>
            <H3 id={basicId}>{basicTitle}</H3>
            <DemoExample
                component={<Basic />}
                source={BasicSrc} />
            <H3 id={pillsId}>{pillsTitle}</H3>
            <DemoExample
                component={<Pills />}
                source={PillsSrc} />
            <H3 id={noAnimId}>{noAnimTitle}</H3>
            <DemoExample
                component={<WithoutAnimation />}
                source={WithoutAnimationSrc} />
            <H3 id={customId}>{customTitle}</H3>
            <DemoExample
                component={<Custom />}
                source={CustomSrc} />
            <DocHeading id={apiId}>API</DocHeading>
            <API />
        </Main>
        <RightNav data={[{
            name: basicTitle,
            href: `#${basicId}`
        }, {
            name: pillsTitle,
            href: `#${pillsId}`
        }, {
            name: noAnimTitle,
            href: `#${noAnimId}`
        }, {
            name: customTitle,
            href: `#${customId}`
        }, {
            name: "API",
            href: `#${apiId}`
        }]} />
    </LangProvider>
)
