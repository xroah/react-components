import * as React from "react";
import PropsTable from "../PropsTable";
import DocHeading from "../DocHeading";
import { commonProps, TRIGGER_TYPE } from "../Dropdown/API";

const TooltipProps = [
    ...commonProps,
    {
        name: "placement",
        type: "top | bottom | left | right",
        default: "top",
        description: "The popover popup position"
    }, {
        name: "header",
        type: "string | ReactNode",
        description: "Header of the popover"
    }, {
        name: "content",
        type: "string | ReactNode",
        description: "Content of the popover"
    }, {
        name: "trigger",
        type: TRIGGER_TYPE,
        default: "click",
        description: "How popover is triggered"
    }
];

export default () => (
    <>
        <DocHeading>API</DocHeading>
        <PropsTable title="Popover" data={TooltipProps} />
    </>
);