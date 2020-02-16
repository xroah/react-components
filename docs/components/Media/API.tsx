import * as React from "react";
import PropsTable from "../PropsTable";
import DocHeading from "../DocHeading";
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
    name: "imgSize",
    type: "number",
    default: "64",
    description: "Size of the image"
},{
    name: "imgRounded",
    type: "boolean",
    default: "false",
    description: "Rounded border radius of image"
},{
    name: "img",
    type: "string | ReactNode",
    description: "Image of media"
},{
    name: "img",
    type: "string | ReactNode",
    description: "Image of media"
}];