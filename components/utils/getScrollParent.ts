export default (el: HTMLElement, until: HTMLElement = document.body) => {
    let parent: HTMLElement = el;

    while ((parent = parent.parentNode as HTMLElement) && until !== parent) {
        const w = parent.clientWidth;
        const h = parent.clientHeight;
        const sw = parent.scrollWidth;
        const sh = parent.scrollHeight;
        const style = getComputedStyle(parent);
        const overflow = style.getPropertyValue("overflow");
        const overflowX = style.getPropertyValue("overflow-x")
        const overflowY = style.getPropertyValue("overflow-y");

        if (
            (w < sw || h < sh) &&
            (
                overflow !== "visible" ||
                overflowX !== "visible" ||
                overflowY !== "visible"
            )
        ) {
            return parent;
        }
    }

    return until;
}