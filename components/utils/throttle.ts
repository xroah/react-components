export default (fn: Function, timeout: number = 100) => {
    let timer: NodeJS.Timeout | null = null;
    let previous = 0;
    let _fn = function throttled() {
        let now = Date.now();
        let remaining = timeout - (now - previous);
        const args = Array.from(arguments);

        if (remaining <= 0) {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }

            previous = now;
            fn.apply(null, args);
        } else if (!timer) {
            timer = setTimeout(() => {
                timer = null;
                fn.apply(null, args);
            }, timeout);
        }
    };

    return _fn;
}