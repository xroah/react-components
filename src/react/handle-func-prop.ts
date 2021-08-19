import noop from "../noop"

export default (prop?: Function) => {
    if (typeof prop !== "function") {
        return noop
    }

    return prop
}