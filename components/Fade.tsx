import * as React from "react";
import CSSTransition, { CSSTransitionProps } from "./CSSTransition";
import { classNames } from "./utils";

export interface FadeProps extends CSSTransitionProps {
    hidingClass?: string;
    toggleDisplay?: boolean;
}

export default function Fade(props: FadeProps) {
    let {
        children,
        hidingClass,
        toggleDisplay,
        style,
        ...otherProps
    } = props;
    let display: any;

    return (
        <CSSTransition {...otherProps}>
            {
                state => {
                    const child = React.Children.only(children) as React.ReactElement;
                    const className = child.props.className;
                    let classes = classNames(className, otherProps.timeout && "fade");
                    let enterSet = new Set(["enter", "entering", "entered"]);

                    if (enterSet.has(state)) {
                        toggleDisplay && (display = "block");

                        if (state !== "enter") {
                            classes = classNames(classes, "show");
                        }
                    } else {
                        classes = classNames(classes);

                        if (state === "exited") {
                            classes = classNames(className, hidingClass);
                            toggleDisplay && (display = "none");
                        }
                    }

                    return React.cloneElement(
                        child,
                        {
                            className: classes,
                            style: {
                                ...style,
                                display
                            }
                        }
                    );
                }
            }
        </CSSTransition>
    );
}