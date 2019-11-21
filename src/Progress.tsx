import * as React from "react";
import PropTypes from "prop-types";
import {
    classNames,
    variantType,
    variantArray
} from "./utils";

export interface ProgressProps extends React.HTMLAttributes<HTMLElement> {
    variant?: variantType;
    value?: number;
    striped?: boolean;
    animated?: boolean;
    showLabel?: boolean;
    __isChild__?: boolean;
}

export default function Progress(props: ProgressProps) {
    const {
        className,
        variant,
        value = 0,
        striped,
        animated,
        children,
        showLabel,
        style = {},
        __isChild__,
        ...otherProps
    } = props;
    const count = React.Children.count(children);
    const classes = classNames(className, "progress");
    const PREFIX = "progress-bar";
    const width = `${value}%`;
    const renderBar = () => (
        <div style={style} className={
            classNames(
                PREFIX,
                striped && `${PREFIX}-striped`,
                striped && animated && `${PREFIX}-animated`,
                variant && `bg-${variant}`
            )
        }>
            {showLabel ? width : null}
        </div>
    );
    const wrapper = <div className={classes} {...otherProps} />;

    style.width = width;

    if (count) {
        const _children = React.Children.map(children, c => {
            if (React.isValidElement(c) && c.type === Progress) {
                return React.cloneElement(c, { __isChild__: true });
            }

            return null;
        });

        return React.cloneElement(wrapper, {}, _children);
    }

    return __isChild__ ?
        renderBar() :
        React.cloneElement(wrapper, {}, renderBar());
}

Progress.defaultProps = {
    value: 0
};
Progress.propTypes = {
    value: PropTypes.number,
    variant: PropTypes.oneOf(variantArray),
    striped: PropTypes.bool,
    animated: PropTypes.bool,
    showLabel: PropTypes.bool
};