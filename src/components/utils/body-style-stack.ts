import { CSSProperties } from "react"

class BodyStyleStack {
    private _styles: CSSProperties[] = []
    private _body = document.body

    public push() {
        const b = this._body
        const { paddingRight } = getComputedStyle(b)

        this._styles.push({
            overflow: b.style.overflow,
            paddingRight: b.style.paddingRight
        })

        b.style.overflow = "hidden"
        b.style.paddingRight = paddingRight
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