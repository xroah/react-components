export function getTransitionDuration(el: HTMLElement) {
    let style = getComputedStyle(el);
    let duration = parseFloat(style.getPropertyValue("transition-duration")) || 0;
    duration += parseFloat(style.getPropertyValue("transition-delay")) || 0;

    return duration;
}

//in case that transitionend event does not fire
export default (el: HTMLElement, handler: Function) => {
    let called = false;
    let timer: any;
    const DELAY = 10;
    const duration = getTransitionDuration(el) * 1000;
    const cancel = () => {
        if (called) return;

        el.removeEventListener("transitionend", _handler);
        clearTimeout(timer);
    };
    const _handler = (evt: TransitionEvent) => {

        if (
            called ||
            // if children set transition, the event will be triggered
            (evt && evt.target !== el)
        ) return;

        called = true;

        cancel();
        handler();
    };

    el.addEventListener("transitionend", _handler);
    timer = setTimeout(_handler, duration + DELAY);

    return cancel;
}