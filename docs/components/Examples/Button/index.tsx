import * as React from "react";
import DocHeading from "../../DocHeading";
import DemoExample from "../../DemoExample";
import Main from "../../Main";
import SyntaxHighlighter from "../../SyntaxHighlighter";
import Basic from "./Basic";
import BasicSrc from "!!raw-loader!./Basic";
import OutlinedSrc from "!!raw-loader!./Outlined";
import Outlined from "./Outlined";
import { Button } from "reap-ui";
import ButtonGroup from "../ButtonGroup";
import Checkbox from "./Checkbox";
import CheckboxSrc from "!!raw-loader!./Checkbox";
import Radio from "./Radio";
import RadioSrc from "!!raw-loader!./Radio";
import API from "./API";
import ButtonGroupAPI from "../ButtonGroup/API";
import LangProvider from "../../Language/LanguageProvider";
import LangMsg from "../../Language/LanguageMessage";
import lang from "./lang";
import RightNav, {
    egId,
    egTitle,
    obId,
    obTitle,
    sizeId,
    sizeTitle,
    acId,
    acTitle,
    dsId,
    dsTitle,
    carId,
    carTitle,
    btnApiId
} from "./RightNav";

const { H3 } = DocHeading;

export default () => (
    <LangProvider language={lang}>
        <Main>
            <DocHeading>Button</DocHeading>
            <div><LangMsg id="compDes" /></div>
            <H3 id={egId}>{egTitle}</H3>
            <DemoExample
                className="btn-demo"
                component={<Basic />}
                source={BasicSrc}>
                <LangMsg id="egDesc" />
            </DemoExample>
            <H3 id={obId}>{obTitle}</H3>
            <DemoExample
                className="btn-demo"
                component={<Outlined />}
                source={OutlinedSrc}>
                <LangMsg id="obDesc" />any button.
            </DemoExample>
            <H3 id={sizeId}>{sizeTitle}</H3>
            <div><LangMsg id="sizeDesc" /></div>
            <div className="btn-demo bd-example">
                <div>
                    <Button variant="primary" size="lg">Large Button</Button>
                    <Button variant="secondary" size="lg">Large Button</Button>
                </div>
                <SyntaxHighlighter code={`<Button variant="primary" size="lg">Large button</Button>
<Button variant="secondary" size="lg">Large button</Button>`} />
            </div>
            <div className="btn-demo bd-example">
                <div>
                    <Button variant="primary" size="sm">Small button</Button>
                    <Button variant="secondary" size="sm">Small button</Button>
                </div>
                <SyntaxHighlighter code={`<Button variant="primary" size="sm">Small button</Button>
<Button variant="secondary" size="sm">Small button</Button>`} />
            </div>
            <div><LangMsg id="blockDesc" /></div>
            <div className="btn-demo bd-example">
                <div>
                    <Button variant="primary" size="lg" block>Block level button</Button>
                    <Button variant="secondary" size="lg" block>Block level button</Button>
                </div>
                <SyntaxHighlighter code={`<Button variant="primary" size="lg" block>Block level button</Button>
<Button variant="secondary" size="lg" block>Block level button</Button>`} />
            </div>
            <H3 id={acId}>{acTitle}</H3>
            <div><LangMsg id="acDesc" /></div>
            <div className="btn-demo bd-example">
                <div>
                    <Button variant="primary" href="#" active>Primary Link</Button>
                    <Button variant="secondary" href="#" active>Link</Button>
                </div>
                <SyntaxHighlighter code={`<Button variant="primary" href="#" active>Primary Link</Button>
<Button variant="secondary" href="#" active>Link</Button>`} />
            </div>
            <H3 id={dsId}>{dsTitle}</H3>
            <div><LangMsg id="dsDesc" /></div>
            <div className="btn-demo bd-example">
                <div>
                    <Button variant="primary" href="#" disabled>Primary Link</Button>
                    <Button variant="secondary" href="#" disabled>Link</Button>
                </div>
                <SyntaxHighlighter code={`<Button variant="primary" href="#" disabled>Primary Link</Button>
<Button variant="secondary" href="#" disabled>Link</Button>`} />
            </div>
            <H3 id={carId}>{carTitle}</H3>
            <DemoExample
                component={<Checkbox />}
                source={CheckboxSrc}>
                <LangMsg id="carDesc" />
            </DemoExample>
            <DemoExample
                component={<Radio />}
                source={RadioSrc} />
            <ButtonGroup />
            <H3 id={btnApiId}>API</H3>
            <API />
            <ButtonGroupAPI /> 
        </Main>
        <RightNav />
    </LangProvider>
);