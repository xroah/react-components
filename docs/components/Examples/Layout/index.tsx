import * as React from "react"
import DocHeading from "../../DocHeading"
import Container from "./Container"
import Grid from "./Grid"
import API from "./API"
import Main from "../../Main"
import LangProvider from "../../Language/LanguageProvider"
import LangMsg from "../../Language/LanguageMessage"
import lang from "./lang"
import RightNav, {apiId} from "./RightNav"

export default () => (
    <LangProvider language={lang}>
        <Main>
            <DocHeading><LangMsg id="overviewTitle" /></DocHeading>
            <div><LangMsg id="overviewDesc" /></div>
            <Container />
            <Grid />
            <DocHeading id={apiId}>API</DocHeading>
            <API />
        </Main>
        <RightNav />
    </LangProvider>
)