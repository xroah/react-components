import * as React from "react";
import DocHeading from "../../DocHeading";
import DemoExample from "../../DemoExample";
import SyntaxHighlighter from "../../SyntaxHighlighter";
import Main from "../../Main";
import { Input } from "reap-ui";
import Basic from "./Basic";
import BasicSrc from "!!raw-loader!./Basic";
import Sizing from "./Sizing";
import SizingSrc from "!!raw-loader!./Sizing";
import Multiple from "./Multiple";
import MultipleSrc from "!!raw-loader!./Multiple";
import MultiAddons from "./MultiAddons";
import MultiAddonsSrc from "!!raw-loader!./MultiAddons";
import ButtonAddons from "./ButtonAddons";
import ButtonAddonsSrc from "!!raw-loader!./ButtonAddons";
import DropdownAddons from "./DropdownAddons";
import DropdownAddonsSrc from "!!raw-loader!./DropdownAddons";
import API from "./API";
import LangProvider from "../../Language/LanguageProvider";
import LangMsg from "../../Language/LanguageMessage";
import lang from "./lang";
import RightNav, {
    egId,
    egTitle,
    readonlyId,
    readonlyTitle,
    plainId,
    plainTitle,
    sizingId,
    sizingTitle,
    multiInputId,
    multiInputTitle,
    multiAddonId,
    multiAddonTitle,
    btnId,
    btnTitle,
    dropdownId,
    dropdownTitle,
    apiId
} from "./RightNav";

const { H3 } = DocHeading;

export default () => (
    <LangProvider language={lang}>
        <Main>
            <DocHeading>Overview</DocHeading>
            <div><LangMsg id="compDesc" /></div>
            <H3 id={egId}>{egTitle}</H3>
            <DemoExample
                component={<Basic />}
                source={BasicSrc}>
                <LangMsg id="egDesc" />
            </DemoExample>
            <H3 id={readonlyId}>{readonlyTitle}</H3>
            <div><LangMsg id="readonlyDesc" /></div>
            <div className="bd-example">
                <Input readOnly value="Readonly input" />
                <SyntaxHighlighter code={`<Input readOnly value="Readonly input"/>`} />
            </div>
            <H3 id={plainId}>{plainTitle}</H3>
            <div><LangMsg id="plainDesc" /></div>
            <div className="bd-example">
                <Input plaintext readOnly value="email@example.com" />
                <SyntaxHighlighter code={`<Input plaintext readOnly value="email@example.com"/>`} />
            </div>
            <H3 id={sizingId}>{sizingTitle}</H3>
            <DemoExample
                component={<Sizing />}
                source={SizingSrc}>
                <LangMsg id="sizingDesc" />
            </DemoExample>
            <H3 id={multiInputId}>{multiInputTitle}</H3>
            <DemoExample
                component={<Multiple />}
                source={MultipleSrc} />
            <H3 id={multiAddonId}>{multiAddonTitle}</H3>
            <DemoExample
                component={<MultiAddons />}
                source={MultiAddonsSrc} />
            <H3 id={btnId}>{btnTitle}</H3>
            <DemoExample
                component={<ButtonAddons />}
                source={ButtonAddonsSrc} />
            <H3 id={dropdownId}>{dropdownTitle}</H3>
            <DemoExample
                component={<DropdownAddons />}
                source={DropdownAddonsSrc} />
            <DocHeading id={apiId}>API</DocHeading>
            <API />
        </Main>
        <RightNav />
    </LangProvider>
);
