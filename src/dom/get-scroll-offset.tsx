export default function getScrollOffset(el: HTMLElement) {
    let left = 0
    let top = 0
    const body = document.body
    const html = document.documentElement

    if (el === body) {
        left = body.scrollLeft || html.scrollLeft
        top = body.scrollTop || html.scrollTop
    } else {
        left = el.scrollLeft
        top = el.scrollTop
    }

    return {
        left,
        top
    }
}