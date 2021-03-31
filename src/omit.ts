export default function omit<T extends object, K extends keyof T>
    (obj: T, props: K[] | K): Partial<T> {
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