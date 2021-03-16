export default function omit<T extends Object, K extends keyof T>(obj: T, props: K[] | K) {
    if (!Array.isArray(props)) {
        props = [props]
    }

    const clone = {...obj}

    for (let prop of props) {
        if (prop in clone) {
            delete clone[prop]
        }
    }


    return clone
}