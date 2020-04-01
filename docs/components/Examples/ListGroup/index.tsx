import * as React from "react";
import DocHeading from "../../DocHeading";
import DemoExample from "../../DemoExample";
import Basic from "./Basic";
import BasicSrc from "!!raw-loader!./Basic";
import ActiveOrDisable from "./ActiveOrDisable";
import ActiveOrDisableSrc from "!!raw-loader!./ActiveOrDisable";
import Action from "./Action";
import ActionSrc from "!!raw-loader!./Action";
import Flush from "./Flush";
import FlushSrc from "!!raw-loader!./Flush";
import Horizontal from "./Horizontal";
import HorizontalSrc from "!!raw-loader!./Horizontal";
import HorizontalSm from "./HorizontalSm";
import HorizontalSmSrc from "!!raw-loader!./HorizontalSm";
import HorizontalLg from "./HorizontalLg";
import HorizontalLgSrc from "!!raw-loader!./HorizontalLg";
import Contextual from "./Contextual";
import ContextualSrc from "!!raw-loader!./Contextual";
import ContextualAction from "./ContextualAction";
import ContextualActionSrc from "!!raw-loader!./ContextualAction";
import Tab from "./Tab";
import TabSrc from "!!raw-loader!./Tab";
import API from "./API";
import Main from "../../Main";
import LangProvider from "../../Language/LanguageProvider";
import LangMsg from "../../Language/LanguageMessage";
import lang from "./lang";
import RightNav, {
    basicId,
    basicTitle,
    aodId,
    aodTitle,
    actionId,
    actionTitle,
    flushId,
    flushTitle,
    horizontalId,
    horizontalTitle,
    ccId,
    ccTitle,
    tabId,
    tabTitle,
    apiId
} from "./RightNav";

const { H3 } = DocHeading;

export default () => (
    <LangProvider language={lang}>
        <Main>
            <DocHeading>List group</DocHeading>
            <div><LangMsg id="compDesc" /></div>
            <H3 id={basicId}>{basicTitle}</H3>
            <DemoExample
                component={<Basic />}
                source={BasicSrc} />
            <H3 id={aodId}>{aodTitle}</H3>
            <DemoExample
                component={<ActiveOrDisable />}
                source={ActiveOrDisableSrc}>
                <LangMsg id="aodDesc" />
            </DemoExample>
            <H3 id={actionId}>{actionTitle}</H3>
            <DemoExample
                component={<Action />}
                source={ActionSrc}>
                <LangMsg id="actionDesc" />
            </DemoExample>
            <H3 id={flushId}>{flushTitle}</H3>
            <DemoExample
                component={<Flush />}
                source={FlushSrc}>
                <LangMsg id="flushDesc" />
            </DemoExample>
            <H3 id={horizontalId}>{horizontalTitle}</H3>
            <DemoExample
                component={<Horizontal />}
                source={HorizontalSrc}>
                <LangMsg id="horizontalDesc" />
            </DemoExample>
            <DemoExample
                component={<HorizontalSm />}
                source={HorizontalSmSrc} />
            <DemoExample
                component={<HorizontalLg />}
                source={HorizontalLgSrc} />
            <H3 id={ccId}>{ccTitle}</H3>
            <DemoExample
                component={<Contextual />}
                source={ContextualSrc}>
                <LangMsg id="ccDesc" />
            </DemoExample>
            <DemoExample
                component={<ContextualAction />}
                source={ContextualActionSrc}>
                <LangMsg id="ccTitle2" />
            </DemoExample>
            <H3 id={tabId}>{tabTitle}</H3>
            <DemoExample
                component={<Tab />}
                source={TabSrc} />
            <DocHeading id={apiId}>API</DocHeading>
            <API />
        </Main>
        <RightNav />
    </LangProvider>
);