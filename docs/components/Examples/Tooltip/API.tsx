import * as React from "react";
import PropsTable from "../../PropsTable";
import DocHeading from "../../DocHeading";
import { commonProps, TRIGGER_TYPE } from "../Dropdown/API";

const TooltipProps = [
    ...commonProps,
    {
        name: "placement",
        type: "top | bottom | left | right",
        default: "top",
        description: "The tooltip popup position"
    }, {
        name: "title",
        type: "string | ReactNode",
        description: "The text shown in the tooltip"
    }, {
        name: "trigger",
        type: TRIGGER_TYPE,
        default: "hover",
        description: "How tooltip is triggered"
    }
];

export default () => (
    <>
        <DocHeading>API</DocHeading>
        <PropsTable title="Tooltip" data={TooltipProps} />
    </>
);