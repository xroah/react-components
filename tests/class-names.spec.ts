import classNames from "../src/class-names"

const CLS1 = "class-name1"
const CLS2 = "class-name2"
const CLS3 = "class-name3"

test("Should be empty string", () => {
    expect(classNames()).toBe("")
    expect(classNames("", null, false, true)).toBe("")
})

test("Should 0 be '0'", () => {
    expect(classNames(0)).toBe("0")
})

test("Should string be correct", () => {
    expect(classNames(CLS1, CLS2)).toBe(`${CLS1} ${CLS2}`)
})

test("Should array be correct", () => {
    expect(classNames(CLS1, [CLS2, CLS3, ""])).toBe(`${CLS1} ${CLS2} ${CLS3}`)
})

test("Should object be correct", () => {
    expect(
        classNames({
            [CLS1]: true,
            [CLS2]: false,
            [CLS3]: true
        })
    ).toBe(`${CLS1} ${CLS3}`)
})

test("Should function be correct", () => {
    expect(classNames(CLS1, () => CLS2)).toBe(`${CLS1} ${CLS2}`)
})

test("Should be unique", () => {
    expect(
        classNames(
            CLS1,
            {
                [CLS2]: true,
                [CLS3]: true
            },
            [CLS1, CLS2],
            CLS3,
            () => CLS1
        )
    ).toBe(`${CLS1} ${CLS2} ${CLS3}`)
})