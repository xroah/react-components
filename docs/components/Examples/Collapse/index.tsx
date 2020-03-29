import * as React from "react";
import DocHeading from "../../DocHeading";
import DemoExample from '../../DemoExample';
import Basic from "./Basic";
import BasicSrc from "!!raw-loader!./Basic";
import Accordion from "./Accordion";
import AccordionSrc from "!!raw-loader!./Accordion";
import API from "./API";
import LangProvider from "../../Language/LanguageProvider";
import LangMsg from "../../Language/LanguageMessage";
import lang from "./lang";
import Main from "../../Main";
import RightNav from "../../RightNav";

const egId = "collapseExample";
const egTitle = <LangMsg id="egTitle" />;
const accordionId = "accordion";
const accordionTitle = <LangMsg id="accordionTitle" />;
const apiId = "collapseApi";

export default () => {
    return (
        <LangProvider language={lang}>
            <Main>
                <DocHeading>Collapse</DocHeading>
                <div><LangMsg id="compDesc" /></div>
                <DocHeading.H3 id={egId}>{egTitle}</DocHeading.H3>
                <DemoExample
                    component={<Basic />}
                    source={BasicSrc} />
                <DocHeading.H3 id={accordionId}>{accordionTitle}</DocHeading.H3>
                <DemoExample
                    component={<Accordion />}
                    source={AccordionSrc} />
                <DocHeading id={apiId}>API</DocHeading>
                <API />
            </Main>
            <RightNav data={[{
                name: egTitle,
                href: `#${egId}`
            }, {
                name: accordionTitle,
                href: `#${accordionId}`
            }, {
                name: "API",
                href: `#${apiId}`
            }]}/>
        </LangProvider>
    );
};