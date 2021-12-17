import {camelCase} from "../../src"

it("Should be camel case", () => {
    const RET = "camelCaseWord"

    expect(camelCase("camel-case-word")).toBe(RET)
    expect(camelCase("camel_case_word", "_")).toBe(RET)
}) 