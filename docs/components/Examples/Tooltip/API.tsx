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
        description: <LangMsg id="placementApi" />
    }, {
        name: "title",
        type: "string | ReactNode",
        description: <LangMsg id="titleApi" />
    }, {
        name: "trigger",
        type: TRIGGER_TYPE,
        default: "hover",
        description: <LangMsg id="triggerApi" />
    }
];

export default () => (
    <PropsTable title="Tooltip" data={TooltipProps} />
);