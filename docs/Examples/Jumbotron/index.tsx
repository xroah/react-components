import * as React from "react"
import DocHeading from "../../components/DocHeading"
import DemoExample from "../../components/DemoExample"
import Main from "../../components/Main"
import RightNav from "../../components/RightNav"
import Demo from "./Demo"
import DemoSrc from "!!raw-loader!./Demo"
import Fluid from "./Fluid"
import FluidSrc from "!!raw-loader!./Fluid"
import API from "./API"
import LangProvider from "../../components/Language/LanguageProvider"
import LangMsg from "../../components/Language/LanguageMessage"
import lang from "./lang"

const egId = "jumbotronExample"
const egTitle = <LangMsg id="egTitle" />
const apiId = "jumbotronApi"

export default () => (
    <LangProvider language={lang}>
        <Main>
            <DocHeading>Jumbotron</DocHeading>
            <div><LangMsg id="compDesc" /></div>
            <DocHeading.H3 id={egId}>{egTitle}</DocHeading.H3>
            <DemoExample
                component={<Demo />}
                source={DemoSrc}>
                <LangMsg id="egDesc" />
            </DemoExample>
            <DemoExample
                component={<Fluid />}
                source={FluidSrc}>
                <LangMsg id="fluidDesc" />
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
        }]} />
    </LangProvider>
)