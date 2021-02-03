export default (prop?: Function) => {
    if (typeof prop !== "function") {
        return () => { }
    }

    return prop
}