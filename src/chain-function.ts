export default (...fn: any[]) => {
    return fn.reduce(
        (acc, cur) => (...args: any[]) => {
            acc.apply(null, args)

            if (typeof cur === "function") {
                cur.apply(null, args)
            }
        },
        () => {}
    )
}