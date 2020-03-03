import * as React from "react";
import PropsTable from "../../PropsTable";
import DocHeading from "../../DocHeading";
/* 

img?: string | React.ReactNode;
    alt?: string;
    header?: string | React.ReactNode;
    imgSize?: number;
    imgRounded?: boolean;
    imgCircle?: boolean;
    alignment?: "top" | "center" | "bottom";
    imgPosition?: "right";
*/
const props = [{
    name: "header",
    type: "string | ReactNode",
    description: "Header of media"
},{
    name: "img",
    type: "string | ReactNode",
    description: "Image of media"
},{
    name: "imgAlt",
    type: "string",
    description: "Alt attribute for the underlying img element"
},{
    name: "imgTitle",
    type: "string",
    description: "Title attribute for the underlying img element"
},{
    name: "imgSize",
    type: "number",
    default: "64",
    description: "Size of the image"
},{
    name: "imgBorder",
    type: "rounded | circle",
    default: "false",
    description: "Rounded or circle border radius of the image"
},{
    name: "imgPosition",
    type: "left | right",
    description: "Place the image on the left or right"
},{
    name: "alignment",
    type: "top | middle | bottom",
    description: "Vertical alignment of the image"
}];