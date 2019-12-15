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

const sizeProp = PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
    PropTypes.oneOf(["auto"]),
    PropTypes.shape({
        span: PropTypes.oneOfType([
            PropTypes.oneOf(["auto"]),
            PropTypes.number
        ]),
        order: PropTypes.number,
        offset: PropTypes.number
    })
]);
export default class Col extends React.Component<ColProps> {

    static propTypes = {
        tag: PropTypes.elementType,
        span: PropTypes.oneOfType([
            PropTypes.oneOf(["auto"]),
            PropTypes.bool,
            PropTypes.number
        ]),
        offset: PropTypes.number,
        order: PropTypes.number,
        sm: sizeProp,
        md: sizeProp,
        lg: sizeProp,
        xl: sizeProp
    };
    static defaultProps = {
        tag: "div"
    };

    handleSize(obj: SizeObject, type: "sm" | "md" | "lg" | "xl" | "col") {

    }

    render() {
        const {
            tag,
            span,
            offset,
            sm,
            md,
            lg,
            xl,
            order,
            className,
            ...otherProps
        } = this.props;
        

        return React.createElement(
            tag as React.ElementType
        );
    }

}