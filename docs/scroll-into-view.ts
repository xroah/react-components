interface Callback {
    (): void;
}

let timer: any = null

export function scrollTo(pos: number, offset = 0) {
    const scroll = () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        const THRESHOLD = 10
        const dis = pos - scrollTop - offset
        let speed = dis / THRESHOLD

        if (Math.abs(speed) < THRESHOLD) {
            speed = speed < 0 ? -THRESHOLD : THRESHOLD
        }

        if (Math.abs(dis) > THRESHOLD) {
            window.scrollTo(0, scrollTop + speed)
            timer = requestAnimationFrame(scroll)

            return
        }

        //complete
        window.scrollTo(0, pos - offset)
    }

    scroll()
}

export default function scrollIntoView(el: HTMLElement | string) {

    if (typeof el === "string") {
        try {
            el = document.querySelector(el) as HTMLElement
        }
        catch (error) {
            return
        }
    }

    if (!el) {
        return
    }

    const OFFSET = 80
    let offsetTop = el.offsetTop
    let parent = el.offsetParent as HTMLElement

    while (parent && parent !== document.body) {
        const borderTop = parseFloat(getComputedStyle(parent).getPropertyValue("border-top")) || 0
        offsetTop += borderTop + parent.offsetTop
        parent = parent.offsetParent as HTMLElement
    }
    
    window.scrollTo(0, offsetTop - OFFSET)
}