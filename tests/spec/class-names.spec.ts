import classNames from "../../src/class-names"

const CLS1 = "class-name1"
const CLS2 = "class-name2"
const CLS3 = "class-name3"

it("Should be empty string", () => {
    expect(classNames()).toBe("")
    expect(classNames("", null, false, true)).toBe("")
})

it("Should 0 be '0'", () => {
    expect(classNames(0)).toBe("0")
})

it("Should string be correct", () => {
    expect(classNames(CLS1, CLS2)).toBe(`${CLS1} ${CLS2}`)
})

it("Should array be correct", () => {
    expect(classNames(CLS1, [CLS2, CLS3, ""])).toBe(`${CLS1} ${CLS2} ${CLS3}`)
})

it("Should object be correct", () => {
    expect(
        classNames({
            [CLS1]: true,
            [CLS2]: false,
            [CLS3]: true
        })
    ).toBe(`${CLS1} ${CLS3}`)
})

it("Should function be correct", () => {
    expect(classNames(CLS1, () => CLS2)).toBe(`${CLS1} ${CLS2}`)
})