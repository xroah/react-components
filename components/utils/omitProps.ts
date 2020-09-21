export default (obj: any, props: string[]) => {
    props.forEach(prop => {
        if (prop in obj) {
            delete obj[prop]
        }
    })

    return obj
}