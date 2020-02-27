import * as React from "react";
import PropTypes from "prop-types";
import { classNames } from "../utils";
import { CommonProps } from "../CommonPropsInterface";

export interface ContainerProps extends CommonProps<HTMLElement> {
    tag?: React.ElementType;
    fluid?: boolean;
    size?: "sm" | "md" | "lg" | "md";
}

export default function Container(props: ContainerProps) {
    const {
        className,
        tag,
        fluid,
        size,
        ...otherProps
    } = props;
    const PREFIX = "container";

    return React.createElement(
        tag as React.ElementType,
        {
            className: classNames(
                className,
                PREFIX,
                size && `${PREFIX}-${size}`,
                fluid && `${PREFIX}-fluid`
            ),
            ...otherProps
        }
    );
}

Container.propTypes = {
    tag: PropTypes.elementType,
    fluid: PropTypes.bool
};

Container.defaultProps = {
    tag: "div"
};