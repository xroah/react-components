import * as React from "react";
import PropTypes from "prop-types";
import {
    classNames,
    variantType,
    variantArray
} from "../utils";
import { CommonProps } from "../Common/CommonPropsInterface";

export interface ProgressProps extends CommonProps<HTMLElement> {
    variant?: variantType;
    value?: number;
    striped?: boolean;
    animated?: boolean;
    showLabel?: boolean;
    __isChild__?: boolean;//internal only, for multiple bars
}

export default function Progress(props: ProgressProps) {
    const {
        className,
        variant,
        value,
        striped,
        animated,
        children,
        showLabel,
        style = {},
        __isChild__,
        ...otherProps
    } = props;
    const count = React.Children.count(children);
    const PREFIX = "progress-bar";
    const v = value!;
    const width = `${v > 100 ? 100 : v < 0 ? 0 : v}%`;
    const bar = (
        <div style={{ width }}
            className={
                classNames(
                    PREFIX,
                    __isChild__ ? className : "",
                    striped && animated && `${PREFIX}-animated`,
                    striped && `${PREFIX}-striped`,
                    variant && `bg-${variant}`
                )
            }>
            {!!showLabel && <span className="label">{width}</span>}
        </div>
    );
    const wrapper = <div className={classNames(className, "progress")} />;

    //multiple progress bars
    if (count) {
        const _children = React.Children.map(children, c => {
            if (React.isValidElement(c) && c.type === Progress) {
                return React.cloneElement<any>(c, { __isChild__: true });
            }

            return c;
        });

        return React.cloneElement(wrapper, { style }, _children);
    }

    return __isChild__ ?
        React.cloneElement<any>(bar, { ...otherProps, style: { ...style, width } }) :
        React.cloneElement<any>(wrapper, { style, ...otherProps }, bar);
}

Progress.defaultProps = {
    value: 0,
    showLabel: false,
    striped: false,
    animated: false
};
Progress.propTypes = {
    value: PropTypes.number,
    variant: PropTypes.oneOf(variantArray),
    striped: PropTypes.bool,
    animated: PropTypes.bool,
    showLabel: PropTypes.bool
};