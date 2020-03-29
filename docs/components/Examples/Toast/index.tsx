import * as React from "react";
import DocHeading from "../../DocHeading";
import DemoExample from "../../DemoExample";
import Basic from "./Basic";
import BasicSrc from "!!raw-loader!./Basic";
import Dismissing from "./Dismissing";
import DismissingSrc from "!!raw-loader!./Dismissing";
import AutoHide from "./AutoHide";
import AutoHideSrc from "!!raw-loader!./AutoHide";
import API from "./API";
import Main from "../../Main";
import LangProvider from "../../Language/LanguageProvider";
import LangMsg from "../../Language/LanguageMessage";
import RightNav from "../../RightNav";
import lang from "./lang";

const egId = "toastExample";
const egTitle = <LangMsg id="egTitle" />;
const dismissingId = "toastDismissing";
const dismissingTitle = <LangMsg id="dismissingTitle" />;
const autoHideId = "autoHideToast";
const autoHideTitle = <LangMsg id="autoHideTitle" />;
const apiId = "toastApi";

export default () => (
    <LangProvider language={lang}>
        <Main>
            <DocHeading>Toast</DocHeading>
            <div><LangMsg id="compDesc" /></div>
            <DocHeading.H3 id={egId}>{egTitle}</DocHeading.H3>
            <DemoExample
                component={<Basic />}
                source={BasicSrc} />
            <DocHeading.H3 id={dismissingId}>{dismissingTitle}</DocHeading.H3>
            <DemoExample
                component={<Dismissing />}
                source={DismissingSrc} />
            <DocHeading.H3 id={autoHideId}>{autoHideTitle}</DocHeading.H3>
            <DemoExample
            component={<AutoHide />}
            source={AutoHideSrc}/>
            <DocHeading id={apiId}>API</DocHeading>
            <API />
        </Main>
        <RightNav data={[{
            name: egTitle,
            href: `#${egId}`
        }, {
            name: dismissingTitle,
            href: `#${dismissingId}`
        }, {
            name: "API",
            href: `#${apiId}`
        }]} />
    </LangProvider>
);