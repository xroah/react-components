import * as React from "react"
import DocHeading from "../../components/DocHeading"
import SyntaxHighlighter from "../../components/SyntaxHighlighter"
import { Progress } from "reap-ui"
import API from "./API"
import Main from "../../components/Main"
import LangProvider from "../../components/Language/LanguageProvider"
import LangMsg from "../../components/Language/LanguageMessage"
import lang from "./lang"
import RightNav, {
    egId,
    egTitle,
    labelsId,
    labelsTitle,
    heightId,
    heightTitle,
    bgId,
    bgTitle,
    multiId,
    multiTitle,
    stripedId,
    stripedTitle,
    animId,
    animTitle,
    apiId
} from "./RightNav"

const { H3 } = DocHeading

export default () => (
    <LangProvider language={lang}>
        <Main>
            <DocHeading>Progress</DocHeading>
            <div><LangMsg id="compDesc" /></div>
            <H3 id={egId}>{egTitle}</H3>
            <div className="bd-example">
                <Progress value={75} />
                <SyntaxHighlighter code="<Progress value={75}/>" />
            </div>
            <H3 id={labelsId}>{labelsTitle}</H3>
            <div><LangMsg id="labelsDesc" /></div>
            <div className="bd-example">
                <Progress showLabel value={25} />
                <SyntaxHighlighter code="<Progress showLabel value={25}/>" />
            </div>

            <H3 id={heightId}>{heightTitle}</H3>
            <div className="bd-example">
                <Progress style={{ height: 1 }} value={25} />
                <Progress value={25} />
                <SyntaxHighlighter code={`<Progress style={{height: 1}} value={25} />
<Progress value={25} />`} />
            </div>

            <H3 id={bgId}>{bgTitle}</H3>
            <div className="bd-example">
                <Progress value={25} variant="success" />
                <Progress value={50} variant="info" />
                <Progress value={75} variant="warning" />
                <Progress value={100} variant="danger" />
            </div>
            <SyntaxHighlighter code={`<Progress value={25} variant="success"/>
<Progress value={50} variant="info"/>
<Progress value={75} variant="warning"/>
<Progress value={100} variant="danger"/>`} />
            <H3 id={multiId}>{multiTitle}</H3>
            <div><LangMsg id="multiDesc" /></div>
            <div className="bd-example">
                <Progress>
                    <Progress value={15} />
                    <Progress value={30} variant="success" />
                    <Progress value={20} variant="info" />
                </Progress>
                <SyntaxHighlighter code={`<Progress value={15}/>
<Progress value={30} variant="success"/>
<Progress value={20} variant="info"/>`} />
            </div>
            <H3 id={stripedId}>{stripedTitle}</H3>
            <div><LangMsg id="stripedDesc" /></div>
            <div className="bd-example">
                <Progress value={25} striped variant="success" />
                <Progress value={50} striped variant="info" />
                <Progress value={75} striped variant="warning" />
                <Progress value={100} striped variant="danger" />
                <SyntaxHighlighter code={`<Progress value={25} striped variant="success"/>
<Progress value={50} striped variant="info"/>
<Progress value={75} striped variant="warning"/>
<Progress value={100} striped variant="danger"/>`} />
            </div>
            <H3 id={animId}>{animTitle}</H3>
            <div><LangMsg id="animDesc" /></div>
            <div className="bd-example">
                <Progress value={75} striped animated />
                <SyntaxHighlighter code={"<Progress value={75} striped animated />"} />
            </div>
            <DocHeading id={apiId}>API</DocHeading>
            <API />
        </Main>
        <RightNav />
    </LangProvider>
)