import {omit} from "../../src/main"

it("Should omitted", () => {
    const obj = {
        a: 1,
        b: 2,
        c: 3,
        d: 4, 
        e: 5
    }

    expect(omit(obj, ["a", "b", "c"])).toEqual({d: 4, e: 5})
})