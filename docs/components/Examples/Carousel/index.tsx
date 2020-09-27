import * as React from "react"
import Demo from "./Demo"
import DemoSrc from "!!raw-loader!./Demo"
import DocHeading from "../../DocHeading"
import DemoExample from "../../DemoExample"
import API from "./API"
import LangProvider from "../../Language/LanguageProvider"
import LangMsg from "../../Language/LanguageMessage"
import Main from "../../Main"
import RightNav from "../../RightNav"
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

