export default (...fn: any[]) => {
    return fn.reduce(
        (acc, cur) => {
            return function chainedFunction() {
                const args = Array.from(arguments)

                acc.apply(null, args)

                if (typeof cur === "function") {
                    cur.apply(null, args)
                }
            }
        },
        () => { }
    )
}