import {CSSProperties} from "react"

export default {
    styleStack: [] as CSSProperties[],
    el: document.body,
    getWidth() {
        const w = document.documentElement.clientWidth

        return Math.abs(window.innerWidth - w)
    },
    isOverflowing() {
        return this.getWidth() > 0
    },
    hide() {
        const w = this.getWidth()

        this.styleStack.push({
            overflow: this.el.style.overflow,
            paddingRight: this.el.style.paddingRight
        })

        if (this.isOverflowing()) {
            this.el.style.paddingRight = `${w}px`
        }

        this.el.style.overflow = "hidden"
    },
    reset() {
        const styles = this.styleStack.pop() as any

        if (!styles) {
            return
        }

        Object.keys(styles).forEach(p => {
            this.el.style[p as any] = styles[p]
        })
    }
}