import * as React from "react"
import PropsTable from "../../PropsTable"
import NoAPI from "../../NoAPI"
import LangMsg from "../../Language/LanguageMessage"

export const TRIGGER_TYPE = "hover | click | focus | Array<hover | click | focus>"
export const commonProps = [
    {
        name: "visible",
        type: "boolean",
        description: <LangMsg id="visibleApi" />
    }, {
        name: "defaultVisible",
        type: "boolean",
        default: "false",
        description: <LangMsg id="defaultVisibleApi" />
    }, {
        name: "fade",
        type: "boolean",
        default: "true",
        description: <LangMsg id="fadeApi" />
    }, {
        name: "forceRender",
        type: "boolean",
        default: "false",
        description: <LangMsg id="forceRenderApi" />
    }, {
        name: "offset",
        type: "number | number[]",
        default: "[0, 0]",
        description: <LangMsg id="offsetApi" />
    }, {
        name: "delay",
        type: "number | {show?: number, hide?: number}",
        default: "0",
        description: <LangMsg id="delayApi" />
    }, {
        name: "onShow",
        type: "Function",
        description: <LangMsg id="onShowApi" />
    }, {
        name: "onShown",
        type: "Function",
        description: <LangMsg id="onShownApi" />
    }, {
        name: "onHide",
        type: "Function",
        description: <LangMsg id="onHideApi" />
    }, {
        name: "onHidden",
        type: "Function",
        description: <LangMsg id="onHiddenApi" />
    }
]

const DropdownProps = [
    ...commonProps,
    {
        name: "placement",
        type: "\"top\" | \"bottom\" | \"left\" | \"right\"",
        default: "bottom",
        description: <LangMsg id="placementApi" />
    }, {
        name: "alignment",
        type: "\"left\" | \"center\" | \"right\"",
        default: "left",
        description: <LangMsg id="alignmentApi" />
    }, {
        name: "overlay",
        type: "ReactElement",
        description: <LangMsg id="overlayApi" />
    }]
const DropdownButtonProps = [{
    name: "variant",
    type: `"primary" |
        "secondary" |
        "success" |
        "danger" |
        "warning" |
        "info" |
        "dark" |
        "light"`,
    default: "primary",
    description: <LangMsg id="variantApi" />
}, {
    name: "size",
    type: "\"lg\" | \"small\"",
    description: <LangMsg id="sizeApi" />
}, {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: <LangMsg id="disabledApi" />
}, {
    name: "outline",
    type: "boolean",
    default: "false",
    description: <LangMsg id="outlineApi" />
}, {
    name: "href",
    type: "string",
    description: <LangMsg id="hrefApi" />
}, {
    name: "split",
    type: "boolean",
    default: "false",
    description: <LangMsg id="splitApi" />
}, {
    name: "render",
    type: "(buttons:ReactNode[]) => ReactNode[]",
    description: <LangMsg id="renderApi" />
}]
const DropdownMenuProps = [{
    name: "header",
    type: "string | ReactNode",
    description: <LangMsg id="headerAPi" />
}]
const MenuItemProps = [{
    name: "tag",
    type: "string",
    default: "a",
    description: <LangMsg id="tagApi" />
}, {
    name: "href",
    type: "string",
    description: <LangMsg id="itemHrefApi" />
}, {
    name: "active",
    type: "boolean",
    default: "false",
    description: <LangMsg id="activeApi" />
}, {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: <LangMsg id="itemDisabledApi" />
}]

export default () => (
    <>
        <PropsTable title="Dropdown" data={DropdownProps} />
        <PropsTable title="Dropdown.Button" data={DropdownButtonProps} />
        <PropsTable title="Dropdown.Menu" data={DropdownMenuProps} />
        <PropsTable title="Dropdown.Item" data={MenuItemProps} />
        <NoAPI title="Dropdown.Divider" />
    </>
)