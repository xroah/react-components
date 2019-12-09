import * as React from "react";
import PropTypes from "prop-types";
import { classNames } from "../utils";

export interface SizeObject {
    offset?: number;
    span?: number;
    order?: number;
}

type sizeType = SizeObject | number | boolean | "auto";

export interface ColProps extends React.HTMLAttributes<HTMLElement> {
    tag?: React.ElementType;
    span?: "auto" | boolean | number;
    offset: number;
    order: number;
    sm?: sizeType;
    md?: sizeType;
    lg?: sizeType;
    xl?: sizeType;
}

export default class Col extends React.Component {

}