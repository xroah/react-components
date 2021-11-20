import {getScrollbarWidth} from "../../src/dom"

it("Should scrollbar width greater than 0", () => {
    expect(getScrollbarWidth()).toBeGreaterThan(0)
})