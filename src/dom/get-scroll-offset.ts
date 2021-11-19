export default function getScrollOffset(el: HTMLElement) {
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