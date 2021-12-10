//get closest positioned(position is not static) parent
export function getPositionedParent(el: HTMLElement) {
    const body = document.body
    let parent = el
    let ret = body

    while ((parent = parent.parentNode as HTMLElement) && parent !== body) {
        const pos = getComputedStyle(parent).getPropertyValue("position")

        if (pos !== "static") {
            ret = parent

            break
        }
    }

    return ret
}

export function getScrollbarWidth() {
    const div = document.createElement("div")
    const SIZE = 200
    const child = document.createElement("div")
    let width

    div.style.cssText = `
        position: absolute;
        left: -10000px;
        overflow: scroll;
        width: ${SIZE}px;
        height: ${SIZE}px;
     `

    div.appendChild(child)
    document.body.appendChild(div)

    width = div.offsetWidth - child.offsetWidth

    document.body.removeChild(div)

    return width
}

export function reflow(el: HTMLElement) {
    return el.offsetHeight
}

export function getScrollOffset(el: HTMLElement) {
    let element: HTMLElement = el
    const {scrollingElement, body} = document

    if (el === body) {
        element = <HTMLElement>scrollingElement
    }

    return {
        left: element.scrollLeft,
        top: element.scrollTop
    }
}

export function getScrollParent(el: HTMLElement) {
    let parent = el.parentElement
    let ret: HTMLElement | null = null
    const {
        body,
        documentElement,
        scrollingElement
    } = document

    if (el === body || el === documentElement) {
        return <HTMLElement>scrollingElement
    }

    while (parent && parent !== scrollingElement) {
        const style = getComputedStyle(parent)
        const overflow = style.getPropertyValue("overflow")
        const overflowX = style.getPropertyValue("overflow-x")
        const overflowY = style.getPropertyValue("overflow-y")

        if (
            overflow !== "visible" ||
            overflowX !== "visible" ||
            overflowY !== "visible"
        ) {
            ret = parent

            break
        }

        parent = parent.parentElement
    }

    if (!ret) {
        ret = <HTMLElement>scrollingElement
    }

    return ret
}

export function getTransitionDuration(el?: HTMLElement): number {
    if (!el) {
        return 0
    }

    const {
        transitionDelay,
        transitionDuration
    } = window.getComputedStyle(el)
    // only take first
    const delay = parseFloat(transitionDelay.split(",")[0]) || 0
    const duration = parseFloat(transitionDuration.split(",")[0]) || 0

    return (delay + duration) * 1000
}

export function executeAfterTransition(
    el: HTMLElement,
    callback: Function,
    transition = true
) {
    if (!transition) {
        return callback()
    }

    let called = false
    let timer: number | null = null
    const timeout = getTransitionDuration(el) + 20
    const fn = () => {
        if (called) {
            return
        }

        called = true

        callback()
        cancel()
    }
    const cancel = () => {
        el.removeEventListener("transitionend", fn)

        if (timer !== null) {
            clearTimeout(timer)

            timer = null
        }

        called = true
    }

    timer = window.setTimeout(fn, timeout)

    el.addEventListener("transitionend", fn)

    return cancel
}