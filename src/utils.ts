import * as React from "react";

interface CreateProps {
    className?: string;
    tag?: string;
    displayName?: string;
}

export function createComponentByClass(options: CreateProps) {
    const {className, tag = "div", displayName} = options;

    let Comp: any = (props: React.HTMLAttributes<Element>) => {
        const {className: _className, ...otherProps} = props;
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

export function getTransitionDuration(el: HTMLElement) {
    let style = getComputedStyle(el);
    let duration = parseFloat(style.getPropertyValue("transition-duration")) || 0;
    duration += parseFloat(style.getPropertyValue("transition-delay")) || 0;

    return duration;
}

//in case that transitionend event does not fire
export function emulateTransitionEnd(el: HTMLElement, handler: Function) {
    let called = false;
    let timer: NodeJS.Timeout;
    const cancel = () => {
        if (called) return;

        el.removeEventListener("transitionend", _handler);
        clearTimeout(timer);
    };
    const _handler = () => {
        cancel();

        if (called) return;

        called = true;

        handler();
    };

    el.addEventListener("transitionend", _handler);
    timer = setTimeout(_handler, getTransitionDuration(el) * 1000);

    return cancel;
}

export function handleFuncProp(prop?: Function) {
    if (typeof prop !== "function") {
        return () => {};
    }

    return prop;
}

export function classNames(...args: any): string　{
    const classes = [];

    for (let arg of args) {
        if (!arg) continue;

        const argType = typeof arg;

        if (argType === "string") {
            classes.push(arg);
        } else if (Array.isArray(arg)) {
            classes.push(classNames(...arg));
        } else if (argType === "object") {
            Object.keys(arg).forEach(a => arg[a] && classes.push(a));
        }
    }

    return classes.join(" ");
}

export const AccordionContext = React.createContext(new Set());
