/* let behaviorSupported = false;

const obj: any = {};

Object.defineProperty(obj, "behavior", {
    get() {
        behaviorSupported = true;
    }
});

const el = document.createElement("div");

el.scrollIntoView(obj); */

interface Callback {
    (): void;
}

let timer: any = null;
let callback: Callback | null = null;

function cancelScroll() {
    if (timer !== null) {
        cancelAnimationFrame(timer);
        timer = null;
    }

    invokeCallback();
}

function invokeCallback() {
    if (callback !== null) {
        callback();
        callback = null;
    }
}

window.addEventListener("wheel", cancelScroll);
window.addEventListener("keydown", e => {
    if (e.key.toLowerCase().includes("arrow")) {
        cancelScroll();
    }
});
window.addEventListener("touchmove", cancelScroll)

export function scrollTo(pos: number, offset = 0) {
    const scroll = () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const THRESHOLD = 10;
        const dis = pos - scrollTop - offset;
        let speed = dis / THRESHOLD;

        if (Math.abs(speed) < THRESHOLD) speed = speed < 0 ? -THRESHOLD : THRESHOLD;

        if (Math.abs(dis) > THRESHOLD) {
            window.scrollTo(0, scrollTop + speed);
            timer = requestAnimationFrame(scroll);

            return;
        }

        //complete
        window.scrollTo(0, pos - offset);
        invokeCallback();
    }

    scroll();
}

export default function scrollIntoView(el: HTMLElement | string, complete: Callback = null) {
    callback = complete;

    if (typeof el === "string") {
        try {
            el = document.querySelector(el) as HTMLElement;
        } catch (error) {
            return invokeCallback();
        }
    }
    
    if (!el) return invokeCallback();

    /* if (behaviorSupported) {
        return el.scrollIntoView({ behavior: "smooth" });
    } */

    if (timer) {
        cancelAnimationFrame(timer);
        timer = null;
    }

    let offsetTop = el.offsetTop;
    let parent = el.offsetParent as HTMLElement;

    while (parent && parent !== document.body) {
        const borderTop = parseFloat(getComputedStyle(parent).getPropertyValue("border-top")) || 0;
        offsetTop += borderTop + parent.offsetTop;
        parent = parent.offsetParent as HTMLElement;
    }
    
    scrollTo(offsetTop, 100);
}