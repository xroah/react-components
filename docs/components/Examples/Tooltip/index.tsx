import * as React from "react";
import DocHeading from "../../DocHeading";
import DemoExample from '../../DemoExample';
import Demo from "./Demo";
import DemoSrc from "!!raw-loader!./Demo";
import WithHTML from "./WithHTML";
import WithHTMLSrc from "!!raw-loader!./WithHTML"
import API from "./API";
import Main from "../../Main";
import RightNav from "../../RightNav";
import LangProvider from "../../Language/LanguageProvider";
import LangMsg from "../../Language/LanguageMessage";
import lang from "./lang";

const egId = "tooltipExamples";
const egTitle = <LangMsg id="egTitle" />;
const htmlId = "tooltipWithCustomHTML";
const htmlTitle = <LangMsg id="htmlTitle" />;
const apiId = "tooltipApi";

export default () => {
    return (
        <LangProvider language={lang}>
            <Main>
                <DocHeading>Tooltip</DocHeading>
                <div><LangMsg id="compDesc" /></div>
                <DocHeading.H3 id={egId}>{egTitle}</DocHeading.H3>
                <DemoExample component={<Demo />} source={DemoSrc} >
                    <LangMsg id="egDesc" />
                </DemoExample>
                <DocHeading.H3 id={htmlId}>{htmlTitle}</DocHeading.H3>
                <DemoExample
                    component={<WithHTML />}
                    source={WithHTMLSrc} />
                <DocHeading id={apiId}>API</DocHeading>
                <API />
            </Main>
            <RightNav data={[{
                name: egTitle,
                href: `#${egId}`
            }, {
                name: htmlTitle,
                href: `#${htmlId}`
            }, {
                name: "API",
                href: `#${apiId}`
            }]} />
        </LangProvider>
    );
};