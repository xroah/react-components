import * as React from "react";
import PropTypes from "prop-types";
import { classNames } from "../utils";

export interface RowProps extends React.HTMLAttributes<HTMLElement> {
    tag?: React.ElementType;
    noGutters?: boolean;
    alignment?: "top" | "center" | "bottom";
    justify?: "left" | "center" | "right" | "between" | "around";
}

export default function Row(props: RowProps) {
    const {
        tag,
        className,
        noGutters,
        alignment,
        justify,
        ...otherProps
    } = props;
    const ALIGN_PREFIX = "align-items";
    const JUSTIFY_PREFIX = "just-content";
    const alignmentMap: any = {
        top: `${ALIGN_PREFIX}-start`,
        center: `${ALIGN_PREFIX}-center`,
        bottom: `${ALIGN_PREFIX}-end`
    };
    const justifyMap: any = {
        left: `${JUSTIFY_PREFIX}-start`,
        center: `${JUSTIFY_PREFIX}-center`,
        right: `${JUSTIFY_PREFIX}-end`,
        between: `${JUSTIFY_PREFIX}-between`,
        around: `${JUSTIFY_PREFIX}-around`
    };

    return React.createElement(
        tag as React.ElementType,
        {
            className: classNames(
                className,
                "row",
                noGutters && "no-gutters",
                alignment && alignmentMap[alignment],
                justify && justifyMap[justify]
            ),
            ...otherProps
        }
    );
}

Row.defaultProps = {
    tag: "div"
};
Row.propTypes = {
    tag: PropTypes.elementType,
    noGutters: PropTypes.bool,
    alignment: PropTypes.oneOf(["top", "center", "bottom"]),
    justify: PropTypes.oneOf(["left", "center", "right", "between", "around"])
};