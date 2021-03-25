export default (el: HTMLElement, until: HTMLElement = document.body) => {
    let parent: HTMLElement = el
    let ret: HTMLElement | null = null

    while ((parent = parent.parentNode as HTMLElement) && until !== parent) {
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
    }

    if (!ret) {
        ret = until
    }

    return ret
}