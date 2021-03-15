import getScrollbarWidth from "../src/dom/get-scroll-bar-width"

it("Should scrollbar width greater than 0", () => {
    expect(getScrollbarWidth()).toBeGreaterThan(0)
})