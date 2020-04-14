export default (obj: Object, props: string[]) => {
    const copy: any = {
        ...obj
    };

    props.forEach(prop => {
        if (prop in copy) {
            delete copy[prop];
        }
    });

    return copy;
}