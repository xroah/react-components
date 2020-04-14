export function getTransitionDuration(el: HTMLElement) {
    let style = getComputedStyle(el);
    let duration = parseFloat(style.getPropertyValue("transition-duration")) || 0;
    duration += parseFloat(style.getPropertyValue("transition-delay")) || 0;

    return duration;
}

//in case that transitionend event does not fire
export default (el: HTMLElement, handler: Function) => {
    let called = false;
    let timer: NodeJS.Timeout;
    const DELAY = 10;
    const duration = getTransitionDuration(el) * 1000;
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
    timer = setTimeout(_handler, duration + DELAY);

    return cancel;
}