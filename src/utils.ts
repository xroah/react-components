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

export interface ElementRect {
    left: number;
    top: number;
    width: number;
    height: number;
    right: number;
    bottom: number;
}

export function getElementRect(el: HTMLElement): ElementRect {
    const body = document.body;
    const html = document.documentElement;
    const scrollTop = body.scrollTop || html.scrollTop || 0;
    const scrollLeft = body.scrollLeft || html.scrollLeft || 0;
    const rect = el.getBoundingClientRect();

    return {
        left: rect.left + scrollLeft,
        top: rect.top + scrollTop,
        width: rect.width,
        height: rect.height,
        right: rect.right,
        bottom: rect.bottom
    };
}

export function throttle(fn: Function, timeout: number = 100) {
    let _fn = function() {
        if (_fn.timer != undefined) {
            clearTimeout(_fn.timer);
        }

        _fn.timer = setTimeout(fn, timeout);
    } as any;

    return _fn;
}

export function getWindowSize() {
    const div = document.createElement("div");
    div.style.cssText = `
        position: fixed;
        left: 0;
        height: 0;
        width: 100%;
        height: 100%;
    `;

    document.body.append(div);

    const size = {
        width: div.clientWidth,
        height: div.clientHeight
    };

    document.body.removeChild(div);

    return size;
}

export const AccordionContext = React.createContext(new Set());
export const OverlayContext = React.createContext({close: () => {}});
