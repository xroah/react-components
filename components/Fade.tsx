import * as React from "react";
import CSSTransition, { CSSTransitionProps } from "./CSSTransition";
import { classNames, handleFuncProp, reflow } from "./utils";

export interface FadeProps extends CSSTransitionProps {
    hidingClass?: string;
}

export default function Fade(props: FadeProps) {
    const {
        children,
        hidingClass,
        ...otherProps
    } = props;

    return (
        <CSSTransition {...otherProps}>
            {
                state => {
                    const child = React.Children.only(children) as React.ReactElement;
                    const className = child.props.className;
                    let classes = classNames(className, "fade");

                    if (state === "entering" || state === "entered") {
                        classes = classNames(classes, "show");
                    } else if (state === "exited") {
                        if (hidingClass) {
                            classes = classNames(className, hidingClass);
                        }
                    }

                    return React.cloneElement(child, { className: classes });
                }
            }
        </CSSTransition>
    );
}