//get closest positioned(position is not static) parent
export default function getPositionedParent(el: HTMLElement) {
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