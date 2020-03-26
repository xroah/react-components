import * as React from "react";
import DocHeading from "../../DocHeading";
import { Spinner, Button } from "reap-ui";
import SyntaxHighlighter from "../../SyntaxHighlighter";
import API from "./API";
import Main from "../../Main";
import LangProvider from "../../Language/LanguageProvider";
import LangMsg from "../../Language/LanguageMessage";
import lang from "./lang";
import RightNav, {
    borderId,
    borderTitle,
    variantId,
    variantTitle,
    growingId,
    growingTitle,
    sizeId,
    sizeTitle,
    btnId,
    btnTitle,
    apiId
} from "./RightNav";

const { H3 } = DocHeading;

export default () => (
    <LangProvider language={lang}>
        <Main>
            <DocHeading>Spinner</DocHeading>
            <div><LangMsg id="compDesc" /></div>
            <H3 id={borderId}>{borderTitle}</H3>
            <div className="bd-example">
                <Spinner animation="border" />
                <SyntaxHighlighter code={`<Spinner animation="border"/>`} />
            </div>
            <H3 id={variantId}>{variantTitle}</H3>
            <div className="bd-example">
                <Spinner animation="border" variant="primary" />
                <Spinner animation="border" variant="secondary" />
                <Spinner animation="border" variant="success" />
                <Spinner animation="border" variant="danger" />
                <Spinner animation="border" variant="warning" />
                <Spinner animation="border" variant="info" />
                <Spinner animation="border" variant="light" />
                <Spinner animation="border" variant="dark" />
                <SyntaxHighlighter code={`<>
    <Spinner animation="border" variant="primary"/>
    <Spinner animation="border" variant="secondary"/>
    <Spinner animation="border" variant="success"/>
    <Spinner animation="border" variant="danger"/>
    <Spinner animation="border" variant="warning"/>
    <Spinner animation="border" variant="info"/>
    <Spinner animation="border" variant="light"/>
    <Spinner animation="border" variant="dark"/>        
</>`} />
            </div>
            <H3 id={growingId}>{growingTitle}</H3>
            <div className="bd-example">
                <Spinner animation="grow" />
                <SyntaxHighlighter code={`<Spinner animation="grow"/>`} />
            </div>
            <div className="bd-example">
                <Spinner animation="grow" variant="primary" />
                <Spinner animation="grow" variant="secondary" />
                <Spinner animation="grow" variant="success" />
                <Spinner animation="grow" variant="danger" />
                <Spinner animation="grow" variant="warning" />
                <Spinner animation="grow" variant="info" />
                <Spinner animation="grow" variant="light" />
                <Spinner animation="grow" variant="dark" />
                <SyntaxHighlighter code={`<>
    <Spinner animation="grow" variant="primary"/>
    <Spinner animation="grow" variant="secondary"/>
    <Spinner animation="grow" variant="success"/>
    <Spinner animation="grow" variant="danger"/>
    <Spinner animation="grow" variant="warning"/>
    <Spinner animation="grow" variant="info"/>
    <Spinner animation="grow" variant="light"/>
    <Spinner animation="grow" variant="dark"/>        
</>`} />
            </div>
            <H3 id={sizeId}>{sizeTitle}</H3>
            <div><LangMsg id="sizeDesc" /></div>
            <div className="bd-example">
                <Spinner animation="border" size="sm" />
                <Spinner animation="grow" size="sm" />
                <SyntaxHighlighter code={`<>
    <Spinner animation="border" size="sm"/>
    <Spinner animation="grow" size="sm"/>
</>`} />
            </div>
            <div><LangMsg id="sizeDesc2" /></div>
            <div className="bd-example">
                <Spinner animation="border" size={50} />
                <Spinner animation="grow" size={50} />
                <SyntaxHighlighter code={`<>
    <Spinner animation="border" size={50}/>
    <Spinner animation="grow" size={50}/>
</>`} />
            </div>
            <H3 id={btnId}>{btnTitle}</H3>
            <div><LangMsg id="btnDesc" /></div>
            <div className="bd-example">
                <Button className="mr-2" disabled>
                    <Spinner animation="border" size="sm" />
                </Button>
                <Button disabled>
                    <Spinner animation="border" size="sm" /> Loading
            </Button>
                <SyntaxHighlighter code={`<>
    <Button disabled>
        <Spinner animation="border" size="sm" />
    </Button>
    <Button disabled>
        <Spinner animation="border" size="sm" /> Loading
    </Button>            
</>`} />
            </div>
            <div className="bd-example">
                <Button className="mr-2" disabled>
                    <Spinner animation="grow" size="sm" />
                </Button>
                <Button disabled>
                    <Spinner animation="grow" size="sm" /> Loading
            </Button>
                <SyntaxHighlighter code={`<>
    <Button disabled>
        <Spinner animation="grow" size="sm" />
    </Button>
    <Button disabled>
        <Spinner animation="grow" size="sm" /> Loading
    </Button>            
</>`} />
            </div>
            <DocHeading id={apiId}>API</DocHeading>
            <API />
        </Main>
        <RightNav />
    </LangProvider>
);