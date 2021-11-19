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