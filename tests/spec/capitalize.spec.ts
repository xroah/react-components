import {capitalize} from "../../src"

it("Should be capitalized", () => {
    expect(capitalize("test")).toBe("Test")
})