import * as React from "react"
import DocHeading from "../../DocHeading"
import DemoExample from "../../DemoExample"
import Basic from "./Basic"
import BasicSrc from "!!raw-loader!./Basic"
import Grid from "./Grid"
import GridSrc from "!!raw-loader!./Grid"
import Row from "./FormRow"
import RowSrc from "!!raw-loader!./FormRow"
import ComplexGrid from "./ComplexGrid"
import ComplexGridSrc from "!!raw-loader!./ComplexGrid"
import Horizontal from "./Horizontal"
import HorizontalSrc from "!!raw-loader!./Horizontal"
import Inline from "./Inline"
import InlineSrc from "!!raw-loader!./Inline"
import Indeterminate from "./Indeterminate"
import IndeterminateSrc from "!!raw-loader!./Indeterminate"
import Validation from "./Validation"
import ValidationSrc from "!!raw-loader!./Validation"
import BrowserDefault from "./BrowserDefault"
import BrowserDefaultSrc from "!!raw-loader!./BrowserDefault"
import Tooltips from "./Tooltips"
import TooltipsSrc from "!!raw-loader!./Tooltips"
import {
    Checkbox,
    Radio,
    Switch
} from "reap-ui"
import API from "./API"
import SyntaxHighlighter from "../../SyntaxHighlighter"
import Main from "../../Main"
import LangProvider from "../../Language/LanguageProvider"
import LangMsg from "../../Language/LanguageMessage"
import lang from "./lang"
import RightNav, {
    basicId,
    basicTitle,
    gridId,
    gridTitle,
    rowId,
    rowTitle,
    horizontalId,
    horizontalTitle,
    inlineId,
    inlineTitle,
    checkboxId,
    checkboxTitle,
    radioId,
    radioTitle,
    switchId,
    switchTitle,
    apiId,
    validationId,
    validationTitle,
    customStylesId,
    customStylesTitle,
    browserDefaultId,
    browserDefaultTitle,
    tooltipsId,
    tooltipsTitle
} from "./RightNav"

const {H3} = DocHeading

export default () => (
    <LangProvider language={lang}>
        <Main>
            <DocHeading>Form</DocHeading>
            <div><LangMsg id="compDesc" /></div>
            <H3 id={basicId}>{basicTitle}</H3>
            <DemoExample
                component={<Basic />}
                source={BasicSrc} />
            <H3 id={gridId}>{gridTitle}</H3>
            <DemoExample
                component={<Grid />}
                source={GridSrc}>
                <LangMsg id="gridDesc" />
            </DemoExample>
            <H3 id={rowId}>{rowTitle}</H3>
            <DemoExample
                component={<Row />}
                source={RowSrc}>
                <LangMsg id="rowDesc" />
            </DemoExample>
            <DemoExample
                component={<ComplexGrid />}
                source={ComplexGridSrc}>
                <LangMsg id="complexDesc" />
            </DemoExample>
            <H3 id={horizontalId}>{horizontalTitle}</H3>
            <DemoExample
                component={<Horizontal />}
                source={HorizontalSrc}>
                <LangMsg id="horizontalDesc" />
            </DemoExample>
            <H3 id={inlineId}>{inlineTitle}</H3>
            <DemoExample
                component={<Inline />}
                source={InlineSrc}>
                <LangMsg id="inlineDesc" />
            </DemoExample>
            <H3 id={validationId}>{validationTitle}</H3>
            <LangMsg id="validationDesc" />
            <H3 id={customStylesId}>{customStylesTitle}</H3>
            <DemoExample
                component={<Validation />}
                source={ValidationSrc}>
                <LangMsg id="customStylesDesc" />
            </DemoExample>
            <H3 id={browserDefaultId}>{browserDefaultTitle}</H3>
            <DemoExample
                component={<BrowserDefault />}
                source={BrowserDefaultSrc}>
                <LangMsg id="browserDefaultDesc" />
            </DemoExample>
            <H3 id={tooltipsId}>{tooltipsTitle}</H3>
            <DemoExample
                component={<Tooltips />}
                source={TooltipsSrc}>
                <LangMsg id="tooltipsDesc" />
            </DemoExample>
            <H3 id={checkboxId}>{checkboxTitle}</H3>
            <div className="bd-example">
                <Checkbox>Check this custom checkbox</Checkbox>
                <Checkbox disabled>Disabled checkbox</Checkbox>
                <SyntaxHighlighter code={"<Checkbox>Check this custom checkbox</Checkbox>\n<Checkbox disabled>Disabled checkbox</Checkbox>"} />
            </div>
            <DemoExample
                component={<Indeterminate />}
                source={IndeterminateSrc}>
                <LangMsg id="indeterminateDesc" />
            </DemoExample>
            <H3 id={radioId}>{radioTitle}</H3>
            <div className="bd-example">
                <Radio name="radio">Toggle this custom radio</Radio>
                <Radio name="radio">Or toggle this other custom radio</Radio>
                <Radio name="radio" disabled>Disabled radio</Radio>
                <SyntaxHighlighter code={"<Radio name=\"radio\">Toggle this custom radio</Radio>\n<Radio name=\"radio\">Or toggle this other custom radio</Radio>\n<Radio name=\"radio\" disabled>Disabled radio</Radio>"} />
            </div>
            <H3 id={switchId}>{switchTitle}</H3>
            <div className="bd-example">
                <Switch defaultChecked>Toggle this switch element</Switch>
                <Switch disabled>Disabled switch</Switch>
                <SyntaxHighlighter code={"<Switch defaultChecked>Toggle this switch element</Switch>\n<Switch disabled>Disabled switch</Switch>"} />
            </div>
            <H3 id={apiId}>API</H3>
            <API />
        </Main>
        <RightNav />
    </LangProvider>
)