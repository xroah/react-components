let behaviorSupported = false;

const obj: any = {};

Object.defineProperty(obj, "behavior", {
    get() {
        behaviorSupported = true;
    }
});

const el = document.createElement("div");

el.scrollIntoView(obj);

let timer: any = null;

function cancelScroll() {
    if (timer !== null) {
        cancelAnimationFrame(timer);
        timer = null;
    }
}

window.addEventListener("wheel", cancelScroll);
window.addEventListener("keydown", e => {
    if (e.key.toLowerCase().includes("arrow")) {
        cancelScroll();
    }
});
window.addEventListener("touchmove", cancelScroll)

export function scrollTo(pos: number) {
    const getScrollTop = () => document.documentElement.scrollTop || document.body.scrollTop;
    const scroll = () => {
        const scrollTop = getScrollTop();
        const NUM = 10;
        const dis = pos - scrollTop;
        let speed = dis / NUM;

        if (Math.abs(speed) < NUM) speed = speed < 0 ? -NUM : NUM;

        if (Math.abs(dis) > NUM) {
            window.scrollTo(0, scrollTop + speed);
            timer = requestAnimationFrame(scroll);

            return;
        }

        window.scrollTo(0, pos);
    }

    scroll();
}

export default function scrollIntoView(el?: HTMLElement) {
    if (!el) return;

    if (behaviorSupported) {
        return el.scrollIntoView({ behavior: "smooth" });
    }

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
    
    scrollTo(offsetTop);
}