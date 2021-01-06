import * as React from "react"
import DocHeading from "../../components/DocHeading"
import DemoExample from "../../components/DemoExample"
import Demo from "./Demo"
import DemoSrc from "!!raw-loader!./Demo"
import FourDirections from "./FourDirections"
import FourDirectionsSrc from "!!raw-loader!./FourDirections"
import API from "./API"
import Main from "../../components/Main"
import RightNav from "../../components/RightNav"
import LangProvider from "../../components/Language/LanguageProvider"
import LangMsg from "../../components/Language/LanguageMessage"
import lang from "./lang"

const egId = "popoverExample"
const egTitle = <LangMsg id="egTitle" />
const fourDirId = "popoverFourDirections"
const fourDirTitle = <LangMsg id="fourDirTitle" />
const apiId = "popoverApi"

export default () => (
    <LangProvider language={lang}>
        <Main>
            <DocHeading>Popover</DocHeading>
            <div><LangMsg id="compDesc" /></div>
            <DocHeading.H3 id={egId}>{egTitle}</DocHeading.H3>
            <DemoExample component={<Demo />} source={DemoSrc} />
            <DocHeading.H3 id={fourDirId}>{fourDirTitle}</DocHeading.H3>
            <DemoExample
                component={<FourDirections />}
                source={FourDirectionsSrc}>
                <LangMsg id="fourDirDesc" />
            </DemoExample>
            <DocHeading id={apiId}>API</DocHeading>
            <API />
        </Main>
        <RightNav data={[{
            name: egTitle,
            href: `#${egId}`
        }, {
            name: fourDirTitle,
            href: `#${fourDirId}`
        }, {
            name: "API",
            href: `#${apiId}`
        }]} />
    </LangProvider>
)