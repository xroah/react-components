import * as React from "react";
import { Container } from "reap-ui"
import LangProvider from "../Language/LanguageProvider"
import LangMsg from "../Language/LanguageMessage"
import lang from "./lang"
import SyntaxHighlighter from "../SyntaxHighlighter";
import logo from "../../assets/logo.svg"
import Button from "../../../components/Button/Button";
import { Link } from "react-router-dom";

const LOGO_SIZE = 150

export default () => (
    <LangProvider language={lang}>
        <Container className="my-3">
            <div className="text-center mb-3">
                <div>
                    <img src={logo} width={LOGO_SIZE} height={LOGO_SIZE} />
                </div>
                <h1 className="mt-3">Reap-ui</h1>
                <p className="my-3" style={{ fontSize: "1.25rem" }}>Bootstrap components built with React</p>
                <div>
                    <Button
                        target="_blank" href="https://github.com/xroah/reap-ui"
                        variant="info"
                        outline>Github</Button>
                    <Link to="/components">
                        <Button className="ml-3" variant="info">
                            <LangMsg id="compBtn" />
                        </Button>
                    </Link>
                </div>
            </div>
            <div>
                <h3><LangMsg id="iTitle" /></h3>
                <hr />
            </div>
            <SyntaxHighlighter code="npm i reap-ui" />
            <div className="mt-3">
                <h3><LangMsg id="iBSTitle" /></h3>
                <hr />
            </div>
            <div>
                <LangMsg id="iBSDesc" />
            </div>
            <SyntaxHighlighter code="npm i bootstrap" />
            <p><LangMsg id="importBSDesc" /></p>
            <SyntaxHighlighter code={`import "bootstrap/dist/css/bootstrap.min.css";`} />
            <p className="my-3">
                <LangMsg id="noteDesc" />
            </p>
        </Container>
    </LangProvider>
);