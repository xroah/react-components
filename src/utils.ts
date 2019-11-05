import * as React from "react";
import classNames from "classnames";

interface CreateProps {
    className?: string;
    tag?: string;
    displayName?: string;
}

export function createComponentByClass(options: CreateProps) {
    const { className, tag = "div", displayName } = options;

    let Comp: any = (props: React.HTMLAttributes<Element>) => {
        const { className: _className, ...otherProps } = props;
        return React.createElement(
            tag,
            {
                displayName,
                className: classNames(className, _className),
                ...otherProps
            }
        );
    };

    if (displayName) {
        Comp.displayName = displayName;
    }

    return Comp;
}