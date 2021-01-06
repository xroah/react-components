import * as React from "react"
import DocHeading from "../../components/DocHeading"
import DemoExample from "../../components/DemoExample"
import Main from "../../components/Main"
import RightNav from "../../components/RightNav"
import Basic from "./Basic"
import BasicSrc from "!!raw-loader!./Basic"
import API from "./API"
import LangProvider from "../../components/Language/LanguageProvider"
import LangMsg from "../../components/Language/LanguageMessage"
import lang from "./lang"

const { H3 } = DocHeading
const egId = "example"
const egTitle = <LangMsg id="egTitle"/>
const apiId = "breadcrumbApi"

export default function Breadcrumb() {
    return (
        <LangProvider language={lang}>
            <Main>
                <DocHeading>BreadCrumb</DocHeading>
                <div>
                    <LangMsg id="compDesc"/>
                </div>
                <H3 id={egId}>{egTitle}</H3>
                <DemoExample
                    component={<Basic />}
                    source={BasicSrc} />
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
}