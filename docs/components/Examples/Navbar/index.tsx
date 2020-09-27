import * as React from "react"
import DocHeading from "../../DocHeading"
import DemoExample from "../../DemoExample"
import { Navbar } from "reap-ui"
import SyntaxHighlighter from "../../SyntaxHighlighter"
import logo from "../../../assets/logo.svg"
import Demo from "./Demo"
import DemoSrc from "!!raw-loader!./Demo"
import Color from "./Color"
import ColorSrc from "!!raw-loader!./Color"
import Toggler from "./Toggler"
import TogglerSrc from "!!raw-loader!./Toggler"
import LeftToggler from "./LeftToggler"
import LeftTogglerSrc from "!!raw-loader!./LeftToggler"
import RightToggler from "./RightToggler"
import RightTogglerSrc from "!!raw-loader!./RightToggler"
import ExternalContent from "./ExternalContent"
import ExternalContentSrc from "!!raw-loader!./ExternalContent"
import API from "./API"
import Main from "../../Main"
import LangProvider from "../../Language/LanguageProvider"
import LangMsg from "../../Language/LanguageMessage"
import lang from "./lang"
import RightNav, {
    egId,
    egTitle,
    supportedId,
    supportedTitle,
    brandId,
    brandTitle,
    textId,
    textTitle,
    colorId,
    colorTitle,
    resId,
    resTitle,
    togglerId,
    togglerTitle,
    externalId,
    externalTitle,
    apiId
} from "./RightNav"

const { H3 } = DocHeading

export default () => (
    <LangProvider language={lang}>
        <Main>
            <DocHeading>Navbar</DocHeading>
            <div><LangMsg id="compDesc" /></div>
            <H3 id={egId}>{egTitle}</H3>
            <DemoExample
                component={<Demo />}
                source={DemoSrc}>
                <LangMsg id="egDesc" />
            </DemoExample>
            <DocHeading id={supportedId}>{supportedTitle}</DocHeading>
            <H3 id={brandId}>{brandTitle}</H3>
            <div><LangMsg id="brandDesc" /></div>
            <div className="bd-example">
                <Navbar bg="light">
                    <Navbar.Brand href="#">Navbar</Navbar.Brand>
                </Navbar>
                <Navbar bg="light">
                    <Navbar.Brand tag="span">Navbar</Navbar.Brand>
                </Navbar>
                <SyntaxHighlighter code={`<!-- As a link -->
<Navbar bg="light">
    <Navbar.Brand href="#">Navbar</Navbar.Brand>
</Navbar>

<!-- As a heading -->
<Navbar bg="light">
    <Navbar.Brand tag="span">Navbar</Navbar.Brand>
</Navbar>
`} />
            </div>
            <div><LangMsg id="brandDesc2" /></div>
            <div className="bd-example">
                <Navbar bg="light">
                    <Navbar.Brand href="#">
                        <img src={logo} alt="" width={30} height={30} />
                    </Navbar.Brand>
                </Navbar>
                <SyntaxHighlighter code={`<!-- Just an image -->
<Navbar bg="light">
    <Navbar.Brand href="#">
        <img src="path/to/img" alt="" width={30} height={30}/>
    </Navbar.Brand>
</Navbar>
`} />
            </div>
            <div className="bd-example">
                <Navbar bg="light">
                    <Navbar.Brand href="#">
                        <img src={logo} alt="" width={30} height={30} />
                    &nbsp;Bootstrap
                    </Navbar.Brand>
                </Navbar>
                <SyntaxHighlighter code={`<!-- Image and text -->
<Navbar bg="light">
    <Navbar.Brand href="#">
        <img src="path/to/img" alt="" width={30} height={30}/>
        &nbsp;Bootstrap
    </Navbar.Brand>
</Navbar>
`} />
            </div>
            <H3 id={textId}>{textTitle}</H3>
            <div><LangMsg id="textDesc" /></div>
            <div className="bd-example">
                <Navbar bg="light">
                    <Navbar.Text>Navbar text with an inline element</Navbar.Text>
                </Navbar>
                <SyntaxHighlighter code={`<Navbar bg="light">
    <Navbar.Text>Navbar text with an inline element</Navbar.Text>
</Navbar>`} />
            </div>
            <H3 id={colorId}>{colorTitle}</H3>
            <DemoExample
                component={<Color />}
                source={ColorSrc}>
                <LangMsg id="colorDesc" />
            </DemoExample>
            <DocHeading id={resId}>{resTitle}</DocHeading>
            <div><LangMsg id="resDesc" /></div>
            <H3 id={togglerId}>{togglerTitle}</H3>
            <DemoExample
                component={<Toggler />}
                source={TogglerSrc}>
                <LangMsg id="togglerDesc" />
            </DemoExample>
            <DemoExample
                component={<LeftToggler />}
                source={LeftTogglerSrc}>
                <LangMsg id="lgDesc" />
            </DemoExample>
            <DemoExample
                component={<RightToggler />}
                source={RightTogglerSrc}>
                <LangMsg id="rgDesc" />
            </DemoExample>
            <H3 id={externalId}>{externalTitle}</H3>
            <DemoExample
                component={<ExternalContent />}
                source={ExternalContentSrc}>
                <LangMsg id="externalDesc" />
            </DemoExample>
            <DocHeading id={apiId}>API</DocHeading>
            <API />
        </Main>
        <RightNav />
    </LangProvider >
)