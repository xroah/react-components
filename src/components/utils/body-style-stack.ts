import { CSSProperties } from "react"

class BodyStyleStack {
    private _styles: CSSProperties[] = []
    private _body = document.body

    private _getScrollBarWidth() {
        const div = document.createElement("div")
        div.style.cssText = `
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
        `
        let ret = 0

        document.body.appendChild(div)
        
        ret = window.innerWidth - div.clientWidth

        document.body.removeChild(div)

        return Math.abs(ret)
    }

    public push() {
        const b = this._body
        const { paddingRight } = getComputedStyle(b)
        const scrollBarWidth = this._getScrollBarWidth()
        const paddingRightNum = Number.parseFloat(paddingRight)
        
        this._styles.push({
            overflow: b.style.overflow,
            paddingRight: b.style.paddingRight
        })

        b.style.overflow = "hidden"
        b.style.paddingRight = `${scrollBarWidth + paddingRightNum}px`
    }

    public pop() {
        const { overflow, paddingRight } = this._styles.pop() || {}
        const b = this._body

        b.style.paddingRight = paddingRight as string
        b.style.overflow = overflow as string
    }
}

const bodyStyleStack = new BodyStyleStack()

export default bodyStyleStack