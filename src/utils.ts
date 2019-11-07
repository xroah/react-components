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

export function reflow(el: HTMLElement) {
    return el.offsetHeight;
}

export function getTransionDuration(el: HTMLElement) {
    let style = getComputedStyle(el);
    let duration = parseFloat(style.getPropertyValue("transition-duration")) || 0;
    duration += parseFloat(style.getPropertyValue("transition-delay")) || 0;

    return duration
}

//in case that transitionend event does not fire
export function emulateTransitionEnd(el: HTMLElement, handler: Function) {
    let called = false;
    let timer: NodeJS.Timeout;
    const _handler = () => {
        el.removeEventListener("transitionend", _handler);

        if (called) {
            if (timer != undefined) clearTimeout(timer);
            return;
        }

        called = true;

        handler();
    };

    el.addEventListener("transitionend", _handler);
    timer = setTimeout(_handler, getTransionDuration(el));
}