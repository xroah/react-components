import * as React from "react";
import PropsTable from "../../PropsTable";
import LangMsg from "../../Language/LanguageMessage";

const CommonProps = [{
    name: "variant",
    type: `"primary" |
        "secondary" |
        "success" |
        "danger" |
        "warning" |
        "info" |
        "dark" |
        "light" |
        "link"`,
    default: "primary",
    description: <LangMsg id="btnVarApi" />
}, {
    name: "size",
    type: "'lg' | 'small'",
    description: <LangMsg id="sizeApi" />
}, {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: <LangMsg id="disabledApi" />
}];
const ButtonProps = [
    ...CommonProps, {
        name: "type",
        type: `"button" | "submit" | "reset"`,
        default: "button",
        description: <LangMsg id="btnTypeApi" />
    }, {
        name: "block",
        type: "boolean",
        default: "false",
        description: <LangMsg id="blockApi" />
    }, {
        name: "active",
        type: "boolean",
        default: "false",
        description: <LangMsg id="activeApi" />
    }, {
        name: "href",
        type: "string",
        description: <LangMsg id="hrefApi" />
    }
];
const ToggleProps = [
    ...CommonProps,
    {
        name: "type",
        type: `"checkbox" | "radio"`,
        description: "Type for underlying input element. If set, the type prop from Button.ToggleGroup will be overrode"
    }
]

export default () => (
    <>
        <PropsTable title="Button" data={ButtonProps} />
        <PropsTable title="Button.Toggle" data={ToggleProps} />
    </>
);