import * as React from "react";
import PropTypes from "prop-types";
import { classNames } from "../utils";

export interface SizeObject {
    offset?: number;
    span?: spanType;
    order?: number;
}

type spanType = "auto" | boolean | number;
type sizeType = SizeObject | number | boolean | "auto";

export interface ColProps extends React.HTMLAttributes<HTMLElement> {
    tag?: React.ElementType;
    span?: spanType;
    offset?: number;
    order?: number;
    sm?: sizeType;
    md?: sizeType;
    lg?: sizeType;
    xl?: sizeType;
}

export const sizePropObject = PropTypes.shape({
    span: PropTypes.oneOfType([
        PropTypes.oneOf(["auto"]),
        PropTypes.number
    ]),
    order: PropTypes.number,
    offset: PropTypes.number
});

const sizeProp = PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
    PropTypes.oneOf(["auto"]),
    sizePropObject
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

    handleSpan(prefix: string, span?: spanType) {
        if (span && span !== true) {
            return `${prefix}-${span}`;
        }

        return prefix;
    }

    handleOffsetOrOrder(type: "order" | "offset", val?: number) {
        return (val == undefined || val < 0) ? "" : `${type}-${val}`;
    }

    handleSize(defaultVal: SizeObject, val: sizeType, type: "sm" | "md" | "lg" | "xl") {
        const prefix = `col-${type}`;

        if (!val) return "";

        if (val === true) {
            return prefix;
        } else if (val === "auto" || typeof val === "number") {
            return `${prefix}-${val}`;
        }

        const order = val.order == undefined ? defaultVal.order : val.order;
        const offset = val.offset == undefined ? defaultVal.offset : val.offset;
        const span = val.span == undefined ? defaultVal.span : val.span;

        return [
            this.handleOffsetOrOrder("offset", offset),
            this.handleOffsetOrOrder("order", order),
            this.handleSpan(prefix, span)
        ];
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
        let classes = classNames(
            className,
            this.handleSpan("col", span),
            this.handleOffsetOrOrder("order", order),
            this.handleOffsetOrOrder("offset", offset)
        );
        let sizeClasses: any[] = [];
        [
            ["sm", sm],
            ["md", md],
            ["lg", lg],
            ["xl", xl]
        ].forEach(([type, val]) => {
            let tmp = this.handleSize(
                {
                    order,
                    offset,
                    span
                },
                val as sizeType,
                type as any
            );
            sizeClasses.push(tmp);
        });

        return React.createElement(
            tag as React.ElementType,
            {
                className: classNames(classes, sizeClasses),
                ...otherProps
            }
        );
    }

}