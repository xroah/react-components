import * as React from "react";
import PropsTable from "../PropsTable";
import DocHeading from "../DocHeading";
import NoAPI from "../NoAPI";

const color = `"primary" |
"secondary" |
"success" |
"danger" |
"warning" |
"info" |
"dark" |
"light"`;

const CardProps = [{
    name: "header",
    type: 'string | ReactNode',
    description: "Card header"
}, {
    name: "footer",
    type: "string | ReactNode",
    default: "",
    description: "Card footer"
}, {
    name: "headerStyle",
    type: "object",
    description: "Customize header style"
}, {
    name: "footerStyle",
    type: "object",
    description: "Customize footer style"
}, {
    name: "body",
    type: "boolean",
    default: "false",
    description: 'Wrap the children with Card.Body. If "isImgOverlay" is true, this prop will be ignored.'
}, {
    name: "img",
    type: "string | ReactNode",
    description: "Card image"
},{
    name: "imgAlt",
    type: "string",
    description: "Alt of the image"
},  {
    name: "imgPosition",
    type: "top | bottom",
    default: "top",
    description: "Position of card image"
}, {
    name: "isImgOverlay",
    type: "boolean",
    default: "false",
    description: "Turn an image into a card background and overlay your card’s text. "
}, {
    name: "alignment",
    type: "left | center | right",
    default: "left",
    description: "Text alignment"
}, {
    name: "bg",
    type: color,
    description: "Background color of card"
}, {
    name: "border",
    type: color,
    description: "Border color of card"
}, {
    name: "color",
    type: `${color} | "white" | "muted" | "white-50" | "black-50"`,
    description: "Text color of card"
}];
const CardTitleProps = [{
    name: "color",
    type: "Same as Card color prop",
    description: "Title color"
}, , {
    name: "subtitle",
    type: "string",
}, , {
    name: "subtitleColor",
    type: `Same as Card color prop`,
    description: "Subtitle color"
}];

export default () => (
    <>
        <DocHeading>API</DocHeading>
        <PropsTable title="Card" data={CardProps} />
        <PropsTable title="Card.Title" data={CardTitleProps} />
        <NoAPI title="Card.Body" />
        <NoAPI title="Card.Link" />
        <NoAPI title="Card.Deck" />
        <NoAPI title="Card.Column" />
        <NoAPI title="Card.Group" />
    </>
);