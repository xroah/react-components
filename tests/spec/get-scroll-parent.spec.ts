import {getScrollParent} from "../../src/dom"

it("Should get scroll parent", () => {
    const html = `
        <div id="scrollParent" style="overflow: auto">
            <div>
                <div id="element"></div>
            </div>
        </div>
    `
    document.body.innerHTML = html
    const el = document.getElementById("element")
    const parent = document.getElementById("scrollParent")

    expect(getScrollParent(el)).toBe(parent)
})

it("Should get body", () => {
    const html = `
        <div id="scrollParent">
            <div id="element"></div>
        </div>
    `
    document.body.innerHTML = html
    const el = document.getElementById("element")

    expect(getScrollParent(el)).toBe(document.body)
})