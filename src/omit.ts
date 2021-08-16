export default function omit<T extends object, K extends keyof T>
    (obj: T, props: K[] | K): Partial<T> {
    if (!Array.isArray(props)) {
        props = [props]
    }

    for (let prop of props) {
        if (prop in obj) {
            delete obj[prop]
        }
    }


    return obj
}