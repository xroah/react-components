import {getScrollParent} from "../../src/dom"
describe("getScrollParent", () => {
    beforeEach(() => {
        const html = `
        <div id="scrollParent">
            <div>
                <div id="element"></div>
            </div>
        </div>
    `
        document.body.innerHTML = html
    })
    afterEach(() => document.body.innerHTML = "")

    it("Should get scroll parent", () => {
        const el = document.getElementById("element")
        const parent = document.getElementById("scrollParent")
        parent.style.overflow = "auto"

        expect(getScrollParent(el) === parent).toBeTrue()
    })

    it("Should get scrollingElement", () => {
        const el = document.body
        const another = document.documentElement
        const scrolling = document.scrollingElement as HTMLElement
        const element = document.getElementById("element")

        expect(getScrollParent(element) === scrolling).toBeTrue()
        expect(getScrollParent(el) === scrolling).toBeTrue()
        expect(getScrollParent(another) === scrolling).toBeTrue()
    })
})