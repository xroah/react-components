import * as React from "react"
import Demo from "./Demo"
import DemoSrc from "!!raw-loader!./Demo"
import DocHeading from "../../components/DocHeading"
import DemoExample from "../../components/DemoExample"
import API from "./API"
import LangProvider from "../../components/Language/LanguageProvider"
import LangMsg from "../../components/Language/LanguageMessage"
import Main from "../../components/Main"
import RightNav from "../../components/RightNav"
import lang from "./lang"

const egId = "carouseExample"
const egTitle = <LangMsg id="egTitle" />
const apiId = "carouselApiId"

export default () => (
    <LangProvider language={lang}>
        <Main>
            <DocHeading>Carousel</DocHeading>
            <div><LangMsg id="compDesc" /></div>
            <DocHeading.H3 id={egId}>{egTitle}</DocHeading.H3>
            <DemoExample
                component={<Demo />}
                source={DemoSrc}>
                <LangMsg id="egDesc" />
            </DemoExample>
            <DocHeading id={apiId}>API</DocHeading>
            <API />
        </Main>
        <RightNav data={[{
            name: egTitle,
            href: `#${egId}`
        }, {
            name: "API",
            href: `#${apiId}`
        }]}/>
    </LangProvider>
)

