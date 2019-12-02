import * as React from "react";
import PropTypes from "prop-types";
import { classNames } from "../utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
    tag?: React.ElementType;
    fluid?: boolean;
}

export default function Container(props: ContainerProps) {
    const {
        className,
        tag,
        fluid,
        ...otherProps
    } = props;
    const PREFIX = "container";

    return React.createElement(
        tag as React.ElementType,
        {
            className: classNames(
                className,
                PREFIX,
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