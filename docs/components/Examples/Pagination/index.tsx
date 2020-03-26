import * as React from "react";
import DocHeading from "../../DocHeading";
import { Pagination } from "reap-ui";
import SyntaxHighlighter from "../../SyntaxHighlighter";
import API from "./API";
import Main from "../../Main";
import LangProvider from "../../Language/LanguageProvider";
import LangMsg from "../../Language/LanguageMessage";
import lang from "./lang";
import RightNav, {
    basicId,
    basicTitle,
    stateId,
    stateTitle,
    sizingId,
    sizingTitle,
    alignmentId,
    alignmentTitle,
    apiId
} from "./RightNav";

const { H3 } = DocHeading;

export default () => (
    <LangProvider language={lang}>
        <Main>
            <DocHeading>Pagination</DocHeading>
            <div><LangMsg id="compDesc" /></div>
            <H3 id={basicId}>{basicTitle}</H3>
            <div className="bd-example">
                <Pagination>
                    <Pagination.Item>上一页</Pagination.Item>
                    <Pagination.Item>1</Pagination.Item>
                    <Pagination.Item>2</Pagination.Item>
                    <Pagination.Item>3</Pagination.Item>
                    <Pagination.Item>下一页</Pagination.Item>
                </Pagination>
                <SyntaxHighlighter code={`<Pagination>
    <Pagination.Item>上一页</Pagination.Item>
    <Pagination.Item>1</Pagination.Item>
    <Pagination.Item>2</Pagination.Item>
    <Pagination.Item>3</Pagination.Item>
    <Pagination.Item>下一页</Pagination.Item>
</Pagination>`} />
            </div>
            <H3 id={stateId}>{stateTitle}</H3>
            <div><LangMsg id="stateDesc" /></div>
            <div className="bd-example">
                <Pagination>
                    <Pagination.Item disabled>上一页</Pagination.Item>
                    <Pagination.Item active>1</Pagination.Item>
                    <Pagination.Item>2</Pagination.Item>
                    <Pagination.Item>3</Pagination.Item>
                    <Pagination.Item>下一页</Pagination.Item>
                </Pagination>
                <SyntaxHighlighter code={`<Pagination>
    <Pagination.Item disabled>上一页</Pagination.Item>
    <Pagination.Item active>1</Pagination.Item>
    <Pagination.Item>2</Pagination.Item>
    <Pagination.Item>3</Pagination.Item>
    <Pagination.Item>下一页</Pagination.Item>
</Pagination>`} />
            </div>
            <H3 id={sizingId}>{sizingTitle}</H3>
            <div><LangMsg id="sizingDesc" /></div>
            <div className="bd-example">
                <Pagination size="sm">
                    <Pagination.Item>1</Pagination.Item>
                    <Pagination.Item active>2</Pagination.Item>
                    <Pagination.Item>3</Pagination.Item>
                </Pagination>
                <SyntaxHighlighter code={`<Pagination size="sm">
    <Pagination.Item>1</Pagination.Item>
    <Pagination.Item active>2</Pagination.Item>
    <Pagination.Item>3</Pagination.Item>
</Pagination>`} />
            </div>
            <div className="bd-example">
                <Pagination size="lg">
                    <Pagination.Item>1</Pagination.Item>
                    <Pagination.Item active>2</Pagination.Item>
                    <Pagination.Item>3</Pagination.Item>
                </Pagination>
                <SyntaxHighlighter code={`<Pagination size="lg">
    <Pagination.Item>1</Pagination.Item>
    <Pagination.Item active>2</Pagination.Item>
    <Pagination.Item>3</Pagination.Item>
</Pagination>`} />
            </div>
            <H3 id={alignmentId}>{alignmentTitle}</H3>
            <div><LangMsg id="alignmentDesc" /></div>
            <div className="bd-example">
                <Pagination alignment="center">
                    <Pagination.Item disabled>上一页</Pagination.Item>
                    <Pagination.Item active>1</Pagination.Item>
                    <Pagination.Item>2</Pagination.Item>
                    <Pagination.Item>3</Pagination.Item>
                    <Pagination.Item>下一页</Pagination.Item>
                </Pagination>
                <SyntaxHighlighter code={`<Pagination alignment="center">
    <Pagination.Item disabled>上一页</Pagination.Item>
    <Pagination.Item active>1</Pagination.Item>
    <Pagination.Item>2</Pagination.Item>
    <Pagination.Item>3</Pagination.Item>
    <Pagination.Item>下一页</Pagination.Item>
</Pagination>`} />
            </div>
            <div className="bd-example">
                <Pagination alignment="right">
                    <Pagination.Item disabled>上一页</Pagination.Item>
                    <Pagination.Item active>1</Pagination.Item>
                    <Pagination.Item>2</Pagination.Item>
                    <Pagination.Item>3</Pagination.Item>
                    <Pagination.Item>下一页</Pagination.Item>
                </Pagination>
                <SyntaxHighlighter code={`<Pagination alignment="right">
    <Pagination.Item disabled>上一页</Pagination.Item>
    <Pagination.Item active>1</Pagination.Item>
    <Pagination.Item>2</Pagination.Item>
    <Pagination.Item>3</Pagination.Item>
    <Pagination.Item>下一页</Pagination.Item>
</Pagination>`} />
            </div>
            <DocHeading id={apiId}>API</DocHeading>
            <API />
        </Main>
        <RightNav />
    </LangProvider>
);