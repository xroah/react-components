import * as React from "react"
import PropsTable from "../../PropsTable"
import NoAPI from "../../NoAPI"
import LangMsg from "../../Language/LanguageMessage"

const color = `"primary" |
"secondary" |
"success" |
"danger" |
"warning" |
"info" |
"dark" |
"light"`

const CardProps = [{
    name: "header",
    type: "string | ReactNode",
    description: <LangMsg id="headerApi" />
}, {
    name: "footer",
    type: "string | ReactNode",
    default: "",
    description: <LangMsg id="footerApi" />
}, /* {
    name: "headerStyle",
    type: "object",
    description: "Customize header style"
}, {
    name: "footerStyle",
    type: "object",
    description: "Customize footer style"
},  */{
    name: "body",
    type: "boolean",
    default: "false",
    description: <LangMsg id="bodyApi" />
}, {
    name: "image",
    type: "ReactElement",
    description: <LangMsg id="imgApi" />
},{
    name: "imgPosition",
    type: "\"top\" | \"bottom\"",
    default: "top",
    description: <LangMsg id="imgPisApi" />
}, {
    name: "isImgOverlay",
    type: "boolean",
    default: "false",
    description: <LangMsg id="overlayApi" />
}, {
    name: "alignment",
    type: "\"left\" | \"center\" | \"right\"",
    default: "left",
    description: <LangMsg id="alignmentApi" />
}, {
    name: "bg",
    type: color,
    description: <LangMsg id="bgApi" />
}, {
    name: "border",
    type: color,
    description: <LangMsg id="borderApi" />
}, {
    name: "color",
    type: `${color} | "white" | "muted" | "white-50" | "black-50"`,
    description: <LangMsg id="colorApi" />
}]
const CardTitleProps = [{
    name: "color",
    type: <LangMsg id="sameAs" />,
    description: <LangMsg id="titleColorApi" />
}, {
    name: "subtitle",
    type: "string"
}, {
    name: "subtitleColor",
    type: <LangMsg id="sameAs" />,
    description: <LangMsg id="subTitleColorApi" />
}]

export default () => (
    <>
        <PropsTable title="Card" data={CardProps} />
        <PropsTable title="Card.Title" data={CardTitleProps} />
        <NoAPI title="Card.Body" />
        <NoAPI title="Card.Link" />
        <NoAPI title="Card.Deck" />
        <NoAPI title="Card.Column" />
        <NoAPI title="Card.Group" />
    </>
)