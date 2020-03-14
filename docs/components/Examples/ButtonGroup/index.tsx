import * as React from "react";
import DemoExample from "../../DemoExample";
import DocHeading from "../../DocHeading";
import Basic from "./Basic";
import BasicSrc from "!!raw-loader!./Basic";
import Sizing from "./Sizing"
import SizingSrc from "!!raw-loader!./Sizing";
import Vertical from "./Vertical";
import VerticalSrc from "!!raw-loader!./Vertical";
import ButtonToolbar from "./ButtonToolbar";
import ButtonToolbarSrc from "!!raw-loader!./ButtonToolbar";
import Nesting from "./Nesting";
import NestingSrc from "!!raw-loader!./Nesting";
import LangMsg from "../../Language/LanguageMessage";

import {
    groupId,
    tbId,
    tbTitle,
    groupSizeId,
    groupSizeTitle,
    nestingId,
    nestingTitle,
    verticalId,
    verticalTitle
} from "../Button/RightNav";

const { H3 } = DocHeading;

export default () => (
    <>
        <DocHeading id={groupId}>Button group</DocHeading>
        <DemoExample
            component={<Basic />}
            source={BasicSrc}>
            <LangMsg id="groupDesc" />
        </DemoExample>
        <H3 id={tbId}>{tbTitle}</H3>
        <DemoExample
            component={<ButtonToolbar />}
            source={ButtonToolbarSrc}>
            <LangMsg id="tbDesc" />
        </DemoExample>
        <H3 id={groupSizeId}>{groupSizeTitle}</H3>
        <DemoExample
            component={<Sizing />}
            source={SizingSrc}>
            <LangMsg id="groupSizeDesc" />
        </DemoExample>
        <H3 id={nestingId}>{nestingTitle}</H3>
        <DemoExample
            component={<Nesting />}
            source={NestingSrc} >
            <LangMsg id="nestingDesc" />
        </DemoExample>
        <H3 id={verticalId}>{verticalTitle}</H3>
        <DemoExample
            component={<Vertical />}
            source={VerticalSrc} >
            <LangMsg id="verticalDesc" />
        </DemoExample>
    </>
);