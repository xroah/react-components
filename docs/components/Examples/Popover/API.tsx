import * as React from "react";
import PropsTable from "../../PropsTable";
import LangMsg from "../../Language/LanguageMessage";
import { commonProps, TRIGGER_TYPE } from "../Dropdown/API";

const TooltipProps = [
    ...commonProps,
    {
        name: "placement",
        type: `"top" | "bottom" | "left" | "right"`,
        default: "top",
        description: <LangMsg id="placementApi"/>
    }, {
        name: "header",
        type: "string | ReactNode",
        description: <LangMsg id="headerApi"/>
    }, {
        name: "content",
        type: "string | ReactNode",
        description: <LangMsg id="contentApi"/>
    }, {
        name: "trigger",
        type: TRIGGER_TYPE,
        default: "click",
        description: <LangMsg id="triggerApi"/>
    }
];

export default () => (
    <PropsTable title="Popover" data={TooltipProps} />
);