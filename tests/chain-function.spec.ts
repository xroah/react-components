import chainFunction from "../src/chain-function"

it("Should all functions be called", () => {
    const fn1 = jasmine.createSpy()
    const fn2 = jasmine.createSpy()
    const chained = chainFunction(fn1, fn2)

    chained()

    expect(fn1).toHaveBeenCalled()
    expect(fn2).toHaveBeenCalled()
    expect(fn1).toHaveBeenCalledBefore(fn2)
})

it("Should be called with specified arguments", () => {
    const args = [1, 2, 3]
    const fn1 = jasmine.createSpy()
    const fn2 = jasmine.createSpy()
    const chained = chainFunction(fn1, fn2)

    chained(...args)

    expect(fn1).toHaveBeenCalledWith(...args)
    expect(fn2).toHaveBeenCalledWith(...args)
})